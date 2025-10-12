import csv

def get_lat_lon(pin):
    with open('data/pincodes.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['pincode'] == pin:
                return float(row['latitude']), float(row['longitude'])
    return None
