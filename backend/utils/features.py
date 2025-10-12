def build_features(soil, weather):
    return [
        soil.get('n', 0),
        soil.get('p', 0),
        soil.get('k', 0),
        weather.get('temp', 0),
        weather.get('humidity', 0),
        weather.get('ph', 0),
        weather.get('rainfall', 0),
        0  # placeholder for missing 8th feature
    ]
