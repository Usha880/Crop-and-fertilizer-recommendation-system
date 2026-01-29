# utils/update_lat_lon.py
import os
import time
import logging
from pymongo import MongoClient
from geopy.geocoders import Nominatim
from dotenv import load_dotenv

# ----------------- Load environment -----------------
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "agriculture_db"

# ----------------- Logging -----------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

# ----------------- MongoDB -----------------
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
locations_col = db.locations

# ----------------- Geocoder -----------------
geolocator = Nominatim(user_agent="agri_latlon_updater", timeout=10)

def get_coordinates(village, mandal, district, state):
    """
    Try geocoding village, then fall back to mandal+district+state.
    Returns (lat, lon) or (None, None) if not found.
    """
    search_order = [
        f"{village}, {mandal}, {district}, {state}",
        f"{mandal}, {district}, {state}",
        f"{district}, {state}"
    ]
    for query in search_order:
        try:
            location = geolocator.geocode(query)
            if location:
                return location.latitude, location.longitude
        except Exception as e:
            logging.warning(f"Geocoding failed for '{query}': {e}")
        time.sleep(1)  # Respect API usage limits
    return None, None

def update_lat_lon():
    total = locations_col.count_documents({})
    logging.info(f"Total locations to process: {total}")

    updated_count = 0
    skipped_count = 0

    for loc in locations_col.find():
        village = loc.get("village")
        mandal = loc.get("mandal", "")
        district = loc.get("district", "")
        state = loc.get("state", "")

        # Skip if lat/lon already exists
        if loc.get("lat") and loc.get("lon"):
            continue

        # Attempt geocoding
        lat, lon = get_coordinates(village, mandal, district, state)
        if lat is None or lon is None:
            logging.warning(f"⚠️ Could not find coordinates for {village}, {mandal}, {district}")
            skipped_count += 1
            continue

        # Update MongoDB
        locations_col.update_one(
            {"_id": loc["_id"]},
            {"$set": {"lat": lat, "lon": lon}}
        )
        logging.info(f"✅ Updated {village}, {mandal}, {district} -> lat:{lat}, lon:{lon}")
        updated_count += 1

    logging.info(f"✅ Finished updating lat/lon. Updated: {updated_count}, Skipped: {skipped_count}")

if __name__ == "__main__":
    update_lat_lon()
