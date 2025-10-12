import requests
import datetime
import os

def get_weather_data(lat, lon, db):
    cache = db.weather_cache.find_one({'lat': lat, 'lon': lon})
    now = datetime.datetime.utcnow()

    if cache and now - cache['timestamp'] < datetime.timedelta(minutes=30):
        return cache['data']

    api_key = os.getenv('OPENWEATHER_API_KEY')
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric'
    resp = requests.get(url).json()

    data = {
        'temp': resp['main']['temp'],
        'humidity': resp['main']['humidity'],
        'rainfall': resp.get('rain', {}).get('1h', 0)
    }

    db.weather_cache.update_one(
        {'lat': lat, 'lon': lon},
        {'$set': {'data': data, 'timestamp': now}},
        upsert=True
    )
    return data
