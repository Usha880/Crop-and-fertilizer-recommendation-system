import pandas as pd
import json

EXCEL_FILE = "backend/Village_List.xlsx"
OUTPUT_FILE = "backend/supported_locations.json"

# Read Excel
df = pd.read_excel(EXCEL_FILE)

print("Columns found:", df.columns.tolist())

# Rename columns to standard names
df = df.rename(columns={
    "State": "state",
    "Dist. Name": "district",
    "Village Name": "village"
})

# Keep only required columns
df = df[["state", "district", "village"]]

# Clean data
df["state"] = df["state"].astype(str).str.strip().str.lower()
df["district"] = df["district"].astype(str).str.strip().str.lower()
df["village"] = df["village"].astype(str).str.strip().str.lower()

# Build nested structure
locations = {}

for _, row in df.iterrows():
    s, d, v = row["state"], row["district"], row["village"]

    locations.setdefault(s, {})
    locations[s].setdefault(d, []).append(v)

# Save JSON
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(locations, f, indent=2)

print("✅ supported_locations.json created successfully")
