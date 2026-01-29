import pandas as pd
from pymongo import MongoClient
import unicodedata

# ================== TELANGANA DISTRICT SOIL DATA ==================
TELANGANA_DISTRICT_SOIL = {
    "Adilabad": {"sand": 30, "silt": 30, "clay": 40, "pH": 6.5, "organic_carbon": 0.7, "N": 35, "P": 20, "K": 30, "soil_type": "Clayey"},
    "Bhadradri Kothagudem": {"sand": 35, "silt": 35, "clay": 30, "pH": 6.6, "organic_carbon": 0.75, "N": 40, "P": 18, "K": 45, "soil_type": "Loamy"},
    "Hyderabad": {"sand": 40, "silt": 40, "clay": 20, "pH": 6.8, "organic_carbon": 0.7, "N": 30, "P": 15, "K": 50, "soil_type": "Loamy"},
    "Jagtial": {"sand": 38, "silt": 32, "clay": 30, "pH": 6.7, "organic_carbon": 0.8, "N": 45, "P": 20, "K": 55, "soil_type": "Clay Loam"},
    "Jangaon": {"sand": 36, "silt": 34, "clay": 30, "pH": 6.6, "organic_carbon": 0.78, "N": 42, "P": 18, "K": 48, "soil_type": "Loamy"},
    "Jayashankar Bhupalpally": {"sand": 32, "silt": 33, "clay": 35, "pH": 6.4, "organic_carbon": 0.82, "N": 50, "P": 22, "K": 40, "soil_type": "Clayey"},
    "Jogulamba Gadwal": {"sand": 42, "silt": 38, "clay": 20, "pH": 6.9, "organic_carbon": 0.65, "N": 28, "P": 14, "K": 45, "soil_type": "Sandy Loam"},
    "Kamareddy": {"sand": 35, "silt": 35, "clay": 30, "pH": 6.6, "organic_carbon": 0.75, "N": 40, "P": 20, "K": 50, "soil_type": "Loamy"},
    "Karimnagar": {"sand": 34, "silt": 36, "clay": 30, "pH": 6.7, "organic_carbon": 0.8, "N": 45, "P": 22, "K": 55, "soil_type": "Clay Loam"},
    "Khammam": {"sand": 37, "silt": 33, "clay": 30, "pH": 6.5, "organic_carbon": 0.78, "N": 48, "P": 21, "K": 52, "soil_type": "Loamy"},
    "Komaram Bheem": {"sand": 30, "silt": 30, "clay": 40, "pH": 6.3, "organic_carbon": 0.85, "N": 55, "P": 25, "K": 38, "soil_type": "Clayey"},
    "Mahabubabad": {"sand": 36, "silt": 34, "clay": 30, "pH": 6.6, "organic_carbon": 0.75, "N": 42, "P": 19, "K": 47, "soil_type": "Loamy"},
    "Mahabubnagar": {"sand": 40, "silt": 35, "clay": 25, "pH": 6.8, "organic_carbon": 0.7, "N": 35, "P": 16, "K": 45, "soil_type": "Sandy Loam"},
    "Mancherial": {"sand": 33, "silt": 32, "clay": 35, "pH": 6.4, "organic_carbon": 0.82, "N": 50, "P": 23, "K": 42, "soil_type": "Clayey"},
    "Medak": {"sand": 38, "silt": 32, "clay": 30, "pH": 6.7, "organic_carbon": 0.76, "N": 44, "P": 20, "K": 48, "soil_type": "Loamy"},
    "Medchal Malkajgiri": {"sand": 42, "silt": 38, "clay": 20, "pH": 6.9, "organic_carbon": 0.68, "N": 30, "P": 15, "K": 50, "soil_type": "Sandy Loam"},
    "Mulugu": {"sand": 32, "silt": 33, "clay": 35, "pH": 6.4, "organic_carbon": 0.83, "N": 52, "P": 24, "K": 40, "soil_type": "Clayey"},
    "Nagarkurnool": {"sand": 40, "silt": 35, "clay": 25, "pH": 6.8, "organic_carbon": 0.72, "N": 34, "P": 16, "K": 46, "soil_type": "Sandy Loam"},
    "Nalgonda": {"sand": 37, "silt": 33, "clay": 30, "pH": 6.6, "organic_carbon": 0.75, "N": 40, "P": 18, "K": 48, "soil_type": "Loamy"},
    "Nirmal": {"sand": 34, "silt": 31, "clay": 35, "pH": 6.5, "organic_carbon": 0.8, "N": 48, "P": 22, "K": 43, "soil_type": "Clayey"},
    "Nizamabad": {"sand": 36, "silt": 34, "clay": 30, "pH": 6.6, "organic_carbon": 0.78, "N": 45, "P": 20, "K": 50, "soil_type": "Loamy"},
    "Peddapalli": {"sand": 33, "silt": 34, "clay": 33, "pH": 6.5, "organic_carbon": 0.82, "N": 50, "P": 22, "K": 45, "soil_type": "Clay Loam"},
    "Rajanna Sircilla": {"sand": 35, "silt": 35, "clay": 30, "pH": 6.6, "organic_carbon": 0.78, "N": 42, "P": 19, "K": 48, "soil_type": "Loamy"},
    "Ranga Reddy": {"sand": 42, "silt": 38, "clay": 20, "pH": 6.9, "organic_carbon": 0.68, "N": 32, "P": 16, "K": 50, "soil_type": "Sandy Loam"},
    "Sangareddy": {"sand": 36, "silt": 34, "clay": 30, "pH": 6.7, "organic_carbon": 0.76, "N": 44, "P": 20, "K": 48, "soil_type": "Loamy"},
    "Siddipet": {"sand": 34, "silt": 36, "clay": 30, "pH": 6.6, "organic_carbon": 0.79, "N": 46, "P": 21, "K": 50, "soil_type": "Clay Loam"},
    "Suryapet": {"sand": 38, "silt": 32, "clay": 30, "pH": 6.7, "organic_carbon": 0.75, "N": 40, "P": 18, "K": 48, "soil_type": "Loamy"},
    "Vikarabad": {"sand": 35, "silt": 35, "clay": 30, "pH": 6.6, "organic_carbon": 0.78, "N": 42, "P": 19, "K": 46, "soil_type": "Loamy"},
    "Wanaparthy": {"sand": 41, "silt": 34, "clay": 25, "pH": 6.8, "organic_carbon": 0.7, "N": 34, "P": 16, "K": 44, "soil_type": "Sandy Loam"},
    "Warangal": {"sand": 33, "silt": 34, "clay": 33, "pH": 6.5, "organic_carbon": 0.8, "N": 48, "P": 22, "K": 46, "soil_type": "Clay Loam"},
    "Warangal Rural": {"sand": 32, "silt": 33, "clay": 35, "pH": 6.4, "organic_carbon": 0.82, "N": 50, "P": 23, "K": 42, "soil_type": "Clayey"},
    "Warangal Urban": {"sand": 34, "silt": 36, "clay": 30, "pH": 6.6, "organic_carbon": 0.78, "N": 44, "P": 20, "K": 48, "soil_type": "Loamy"},
    "Yadadri Bhuvanagiri": {"sand": 36, "silt": 34, "clay": 30, "pH": 6.6, "organic_carbon": 0.75, "N": 42, "P": 19, "K": 47, "soil_type": "Loamy"}
}

DEFAULT_SOIL = {
    "sand": 40, "silt": 40, "clay": 20,
    "pH": 6.5, "organic_carbon": 0.7,
    "N": 30, "P": 15, "K": 35,
    "soil_type": "Loamy"
}
# ===============================================================

def clean_text(text):
    """Clean string: remove non-ASCII chars and strip spaces"""
    if not isinstance(text, str):
        text = str(text)
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    return text.strip()

# Read Excel file
df = pd.read_html("village List.xls")[0]

# Rename columns
df.columns = [
    "sr_no", "state", "district", "mandal", "village",
    "col6","col7","col8","col9","col10","col11","col12","col13","col14","col15","col16","col17"
]

# Remove header rows if present
df = df[df["state"].str.lower() != "state"]

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client["agriculture_db"]
collection = db["locations"]

# Optional: clear old data
collection.delete_many({})

records = []

for _, row in df.iterrows():
    state = clean_text(row["state"])
    district_name = clean_text(row["district"])
    mandal = clean_text(row["mandal"])
    village = clean_text(row["village"])

    soil = TELANGANA_DISTRICT_SOIL.get(district_name, DEFAULT_SOIL)

    doc = {
        "state": state,
        "district": district_name,
        "mandal": mandal,
        "village": village,

        "sand": soil["sand"],
        "silt": soil["silt"],
        "clay": soil["clay"],
        "pH": soil["pH"],
        "organic_carbon": soil["organic_carbon"],
        "N": soil["N"],
        "P": soil["P"],
        "K": soil["K"],
        "soil_type": soil["soil_type"],

        # Initialize coordinates for later
        "lat": None,
        "lon": None
    }

    records.append(doc)

collection.insert_many(records)

print(f"✅ Imported {len(records)} villages with soil data into MongoDB (names cleaned, lat/lon initialized)")
