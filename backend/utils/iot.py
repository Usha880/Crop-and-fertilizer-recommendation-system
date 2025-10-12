import random

def get_iot_data(lat, lon):
    return {
        'n': round(random.uniform(0, 100), 1),
        'p': round(random.uniform(0, 100), 1),
        'k': round(random.uniform(0, 100), 1),
        'ph': round(random.uniform(5.5, 8.0), 2),
        'moisture': round(random.uniform(10, 50), 1)
    }
