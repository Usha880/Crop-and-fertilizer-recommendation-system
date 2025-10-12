import React, { useState } from "react";
import { resolvePin } from "../api/geoAPI";
import { getCropRecommendation } from "../api/recommendationAPI";

export default function FarmerPortal() {
  const [pincode, setPincode] = useState("");
  const [landArea, setLandArea] = useState("");
  const [irrigation, setIrrigation] = useState(false);
  const [cropPreference, setCropPreference] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRecommendations(null);
    setLoading(true);

    try {
      // Resolve pincode to lat/lon
      const geo = await resolvePin(pincode);
      if (!geo.lat || !geo.lon) {
        throw new Error("Failed to resolve location for given pincode.");
      }

      // Call backend recommendation API
      const rec = await getCropRecommendation(geo.lat, geo.lon);
      setRecommendations(rec);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Farmer Portal</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <label>
          Pincode:
          <input value={pincode} onChange={(e) => setPincode(e.target.value)} required />
        </label>
        <label>
          Land Area (acres):
          <input
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            type="number"
            required
          />
        </label>
        <label>
          Irrigation Available:
          <input
            type="checkbox"
            checked={irrigation}
            onChange={() => setIrrigation(!irrigation)}
          />
        </label>
        <label>
          Crop Preference (optional):
          <input value={cropPreference} onChange={(e) => setCropPreference(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {recommendations && (
        <>
          <h3>Recommended Crop</h3>
          <pre>{JSON.stringify(recommendations.crop, null, 2)}</pre>
          <h3>Prediction Score</h3>
          <pre>{JSON.stringify(recommendations.score, null, 2)}</pre>
          <h3>Soil Data</h3>
          <pre>{JSON.stringify(recommendations.soil, null, 2)}</pre>
          <h3>Fertilizer Recommendation</h3>
          <pre>{JSON.stringify(recommendations.fertilizer, null, 2)}</pre>
        </>
      )}
    </>
  );
}
