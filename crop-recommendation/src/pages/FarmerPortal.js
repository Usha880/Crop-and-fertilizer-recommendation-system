import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000/api";

export default function FarmerPortal() {
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [weather, setWeather] = useState(null);
  const [crops, setCrops] = useState([]);

  /* 🔁 LOAD SAVED DATA (IMPORTANT FIX) */
  useEffect(() => {
    const saved = localStorage.getItem("latestPrediction");
    if (saved) {
      const data = JSON.parse(saved);
      setDistrict(data.district || "");
      setWeather(data.weather || null);
      setCrops(data.crops || []);
    }
  }, []);

  const submit = async () => {
    if (!district.trim()) {
      setError("Please enter district");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: "Telangana",
          district: district.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to get recommendations");
        setLoading(false);
        return;
      }

      /* ✅ SAVE FOR ALL PAGES */
      const payload = {
        state: "Telangana",
        district: district.trim(),
        weather: data.weather,
        crops: data.crops
      };

      localStorage.setItem("latestPrediction", JSON.stringify(payload));

      setWeather(data.weather);
      setCrops(data.crops || []);

      /* 🔐 OPTIONAL: SAVE TO DATABASE */
      fetch(`${API}/savePrediction`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "guest",
    state: "Telangana",
    district: district.trim(),
    village: "", // add later
    soil_data: {}, // from soil API later
    recommended_crops: data.crops,
    weather: data.weather
  })
});


    } catch (err) {
      console.error(err);
      setError("Failed to get recommendations");
    }

    setLoading(false);
  };

  /* 🔄 START FRESH (ONLY RESET HERE) */
  const startFresh = () => {
    setDistrict("");
    setWeather(null);
    setCrops([]);
    setError("");
    setLoading(false);

    localStorage.removeItem("latestPrediction");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px" }}>
      <h2>🌾 Farmer Portal</h2>

      <p><b>State:</b> Telangana</p>

      <input
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        placeholder="Enter District (e.g., Warangal)"
        style={{ width: "300px", padding: "8px" }}
      />

      <br /><br />

      <button onClick={submit} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      <button
        onClick={startFresh}
        style={{
          marginLeft: "12px",
          padding: "8px 14px",
          background: "#b71c1c",
          color: "#fff",
          border: "none",
          borderRadius: "6px"
        }}
      >
        🔄 Start Fresh
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🌦 WEATHER */}
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>🌦 Weather</h3>
          <p>🌡 Temperature: {weather.temperature} °C</p>
          <p>💧 Humidity: {weather.humidity} %</p>
          <p>🌧 Rainfall: {weather.rainfall} mm</p>
        </div>
      )}

      {/* 🌾 CROPS */}
      {Array.isArray(crops) && crops.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>🌱 Recommended Crops & Fertilizers</h3>

          {crops.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
            >
              <h4>{item.name}</h4>
              <p><b>Recommended Fertilizer:</b> {item.fertilizer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
