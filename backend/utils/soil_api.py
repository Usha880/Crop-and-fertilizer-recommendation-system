import requests

def fetch_soilgrids_properties(lat, lon):
    url = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lat={lat}&lon={lon}"
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("SoilGrids API request failed")
    data = response.json()

    props = data.get('properties', {})
    soil = {
        'sand': props.get('sand', {}).get('values', {}).get('0-5cm', {}).get('mean'),
        'silt': props.get('silt', {}).get('values', {}).get('0-5cm', {}).get('mean'),
        'clay': props.get('clay', {}).get('values', {}).get('0-5cm', {}).get('mean'),
        'ph': props.get('phh2o', {}).get('values', {}).get('0-5cm', {}).get('mean'),
        'organic_carbon': props.get('ocd', {}).get('values', {}).get('0-5cm', {}).get('mean'),
    }
    return soil
