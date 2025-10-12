from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pickle
import os
import xarray as xr
from dotenv import load_dotenv
from utils.geo import get_lat_lon
from utils.weather import get_weather_data
from utils.soil_api import fetch_soilgrids_properties    # Existing SoilGrids API (optional)
from utils.features import build_features
from utils.fertilizer import compute_gaps


load_dotenv()


app = Flask(__name__)
CORS(app)


mongo_uri = os.getenv('MONGO_URI')
if not mongo_uri:
    raise ValueError("MONGO_URI is not set in environment variables")


client = MongoClient(mongo_uri)
db = client['agriculture_db']


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models')


def load_pickle(filename):
    path = os.path.join(MODEL_DIR, filename)
    with open(path, 'rb') as f:
        return pickle.load(f)


crop_model = load_pickle('crop_recommend_model.pkl')
fertilizer_model = load_pickle('fertilizer_model.pkl')
le_soil_type = load_pickle('le_soil_type.pkl')
scaler = load_pickle('scaler.pkl')
le_crop_type = load_pickle('le_crop_type.pkl')


DATA_DIR = os.path.join(BASE_DIR, 'data', 'ncfiles')
crop_datasets = {}


for filename in os.listdir(DATA_DIR):
    if filename.endswith('.nc'):
        crop_name = filename.replace('NPKGRIDSv1.08_', '').replace('.nc', '').lower()
        crop_datasets[crop_name] = xr.open_dataset(os.path.join(DATA_DIR, filename))


print(f"Loaded crop datasets: {list(crop_datasets.keys())}")


def get_npk_for_crop(crop, lat, lon):
    crop = crop.lower().strip()
    if crop not in crop_datasets:
        raise ValueError(f"Crop '{crop}' dataset not found")
    ds = crop_datasets[crop]
    n = ds['Nrate'].sel(lat=lat, lon=lon, method='nearest').values.item()
    p = ds['P2O5rate'].sel(lat=lat, lon=lon, method='nearest').values.item()
    k = ds['K2Orate'].sel(lat=lat, lon=lon, method='nearest').values.item()
    print(f"NPK values: N={n}, P={p}, K={k}")
    moisture = 0
    return {'n': n, 'p': p, 'k': k, 'moisture': moisture}


@app.route('/api/geo/resolve')
def geo_resolve():
    pin = request.args.get('pincode')
    if not pin:
        return jsonify({'error': 'PIN parameter is required'}), 400
    loc = get_lat_lon(pin)
    if loc:
        return jsonify({'latitude': loc[0], 'longitude': loc[1]})
    return jsonify({'error': 'PIN not found'}), 404


@app.route('/api/weather/current')
def weather_current():
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
    except (TypeError, ValueError):
        return jsonify({'error': 'lat and lon parameters must be valid numbers'}), 400
    weather = get_weather_data(lat, lon, db)
    return jsonify(weather)


@app.route('/api/iot/latest')
def iot_latest():
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        crop = request.args.get('crop')
        if not crop:
            return jsonify({'error': 'crop parameter is required'}), 400
    except (TypeError, ValueError):
        return jsonify({'error': 'lat, lon, and crop parameters must be valid numbers'}), 400

    try:
        data = get_npk_for_crop(crop, lat, lon)
    except Exception as e:
        return jsonify({'error': f'Error fetching soil data: {str(e)}'}), 500

    return jsonify(data)


@app.route('/api/recommend/crop', methods=['POST'])
def recommend_crop():
    data = request.json
    if not data or 'lat' not in data or 'lon' not in data:
        return jsonify({'error': 'lat and lon are required in JSON body'}), 400

    try:
        lat = float(data.get('lat'))
        lon = float(data.get('lon'))
    except ValueError:
        return jsonify({'error': 'lat and lon must be numbers'}), 400

    # Use default crop (e.g., 'rice') nutrients for prediction features
    try:
        default_crop = 'rice'
        nutrients_for_pred = get_npk_for_crop(default_crop, lat, lon)
    except Exception as e:
        return jsonify({'error': f'Error getting soil nutrients for prediction: {str(e)}'}), 500

    weather_data = get_weather_data(lat, lon, db)

    features = build_features(nutrients_for_pred, weather_data)

    # Removed redundant scaler.transform call here
    # if scaler:
    #     features = scaler.transform([features])[0]

    crop_pred_encoded = crop_model.predict([features])[0]
    crop_pred = le_crop_type.inverse_transform([crop_pred_encoded])[0] if le_crop_type else crop_pred_encoded
    crop_prob = crop_model.predict_proba([features])[0].max()

    # Now fetch nutrients for predicted crop for fertilizer gaps
    try:
        nutrients_for_fertilizer = get_npk_for_crop(crop_pred, lat, lon)
    except Exception as e:
        return jsonify({'error': f'Error getting soil nutrients for fertilizer: {str(e)}'}), 500

    crop_ideal = {'n': 50, 'p': 30, 'k': 40}  # Could be dynamic per crop in future
    gaps = compute_gaps(crop_ideal, nutrients_for_fertilizer)

    db.runs.insert_one({
        'lat': lat,
        'lon': lon,
        'soil': nutrients_for_fertilizer,
        'weather': weather_data,
        'features': features.tolist() if hasattr(features, 'tolist') else features,
        'prediction': crop_pred,
        'score': float(crop_prob)
    })

    return jsonify({
        'crop': crop_pred,
        'score': round(crop_prob, 2),
        'soil': nutrients_for_fertilizer,
        'fertilizer': gaps
    })


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
