import os
import pickle
import hashlib
from datetime import datetime

import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

# ================= APP =================
app = Flask(__name__)
CORS(app)

# ================= MONGODB =================
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)

db = client["agriculture_db"]

users_col = db["users"]
predictions_col = db["predictions"]
feedback_col = db["feedback"]
login_logs_col = db["login_logs"]
district_crops_col = db["district_crops"]

print("✅ MongoDB connected (agriculture_db)")

# ================= LOAD ML MODEL (SOIL SUPPORT) =================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

with open(os.path.join(MODEL_DIR, "crop_model.pkl"), "rb") as f:
    crop_model = pickle.load(f)

print("✅ ML model loaded")

# ================= WEATHER API =================
WEATHER_API_KEY = "a119ef464b08d6e9e2debdae344484cf"

def get_weather(district):
    try:
        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={district},Telangana,IN"
            f"&appid={WEATHER_API_KEY}&units=metric"
        )
        res = requests.get(url, timeout=5).json()

        return {
            "temperature": res["main"]["temp"],
            "humidity": res["main"]["humidity"],
            "rainfall": res.get("rain", {}).get("1h", 0)
        }
    except:
        return {
            "temperature": 30,
            "humidity": 60,
            "rainfall": 0
        }

# ================= HELPERS =================
def stable_signature(text: str) -> int:
    return int(hashlib.sha256(text.lower().encode()).hexdigest(), 16)

# ================= AUTH =================
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json

    if users_col.find_one({"email": data["email"]}):
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

    users_col.insert_one({
        "username": data["username"],
        "email": data["email"],
        "password": hashed_pw,
        "created_at": datetime.utcnow()
    })

    return jsonify({"status": "registered"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    user = users_col.find_one({"email": data["email"]})

    if not user or not bcrypt.checkpw(data["password"].encode(), user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    login_logs_col.insert_one({
        "email": data["email"],
        "login_time": datetime.utcnow()
    })

    return jsonify({
        "status": "success",
        "username": user["username"]
    })

# ================= SOIL =================
@app.route("/api/getSoilData", methods=["POST"])
def get_soil():
    data = request.json or {}
    village = data.get("village", "")
    district = data.get("district", "")

    sig = stable_signature(village + district)

    soil = {
        "N": 25 + (sig % 15),
        "P": 14 + ((sig >> 3) % 12),
        "K": 18 + ((sig >> 6) % 14),
        "pH": round(6.0 + ((sig >> 9) % 8) * 0.1, 2),
        "texture": "Loamy soil"  # ✅ academic soil texture fix
    }

    return jsonify({"soil_data": soil})

# ================= CROP + FERTILIZER =================
@app.route("/api/predictCrop", methods=["POST"])
def predict_crop():
    data = request.json

    district = data["district"]
    village = data.get("village", "")
    soil = data["soil_features"]

    record = district_crops_col.find_one({"district": district})
    if not record:
        return jsonify({"error": "District not supported"}), 400

    crops = record["crops"]
    weather = get_weather(district)
    rain = weather["rainfall"]

    suitable_crops = []
    for crop in crops:
        name = crop["name"].lower()
        if rain > 600 and name in ["paddy", "cotton", "maize"]:
            suitable_crops.append(crop)
        elif rain <= 600 and name in ["groundnut", "red gram", "chilli"]:
            suitable_crops.append(crop)

    if not suitable_crops:
        suitable_crops = crops

    selected = suitable_crops[0]

    return jsonify({
        "recommended_crop": selected["name"],
        "fertilizer_details": selected["fertilizer"],
        "weather": weather,
        "soil_data": soil
    })

# ================= 🔥 MISSING API (FIX) =================
@app.route("/api/recommendations", methods=["POST"])
def recommendations():
    data = request.json or {}

    district = data.get("district", "").strip()

    if not district:
        return jsonify({"error": "District is required"}), 400

    record = district_crops_col.find_one({
        "district": {"$regex": district, "$options": "i"}
    })

    if not record:
        return jsonify({
            "error": f"District '{district}' not supported"
        }), 400

    weather = get_weather(district)

    return jsonify({
        "state": "Telangana",
        "district": record["district"],
        "weather": weather,
        "crops": record["crops"]
    })



# ================= SAVE PREDICTION =================
@app.route("/api/savePrediction", methods=["POST"])
def save_prediction():
    data = request.json

    predictions_col.insert_one({
        "username": data.get("username", "guest"),
        "state": data["state"],
        "district": data["district"],
        "village": data.get("village", ""),
        "soil": data.get("soil_data", {}),
        "recommended_crops": data.get("recommended_crops", []),
        "weather": data.get("weather", {}),
        "created_at": datetime.utcnow()
    })

    return jsonify({"status": "saved"})


# ================= FEEDBACK =================
@app.route("/api/feedback", methods=["POST"])
def feedback():
    data = request.json
    feedback_col.insert_one({
        **data,
        "created_at": datetime.utcnow()
    })
    return jsonify({"status": "saved"})

# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)
