import { useState } from "react";
import DashboardLayout from "./DashboardLayout";

const HomePage = () => {
  const [formData, setFormData] = useState({
    pincode: "",
    area: "",
    irrigation: "Yes",
    preference: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper function to resolve pincode to lat/lon
  const resolvePin = async (pin) => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/geo/resolve?pin=${pin}`
    );
    if (!response.ok) {
      throw new Error("Failed to resolve Pincode");
    }
    return response.json();
  };

  // Helper function to fetch crop recommendation
  const getCropRecommendation = async (lat, lon) => {
    const response = await fetch(`http://127.0.0.1:5000/api/recommend/crop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lon }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch crop recommendation");
    }
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);
    setLoading(true);

    try {
      // Resolve pincode to lat, lon
      const loc = await resolvePin(formData.pincode);
      if (!loc.lat || !loc.lon) {
        setError("Invalid Pincode");
        setLoading(false);
        return;
      }

      // Get crop & fertilizer recommendation from backend
      const rec = await getCropRecommendation(loc.lat, loc.lon);

      // Show recommendation in UI
      setRecommendation(rec);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Enter Farm Details</h2>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        {/* Pincode */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">📍 Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter your area pincode"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Land Area */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">🌾 Land Area (in acres)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter land area"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Irrigation */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">💧 Irrigation Available?</label>
          <select
            name="irrigation"
            value={formData.irrigation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Crop Preference */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">🌱 Preferred Crop (Optional)</label>
          <input
            type="text"
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            placeholder="E.g. Wheat, Rice"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {/* Show error if occurs */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Show recommendation below form */}
      {recommendation && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h3 className="text-xl font-semibold mb-2">Crop Recommendation</h3>
          <p>
            <strong>Crop:</strong> {recommendation.crop}
          </p>
          <p>
            <strong>Confidence Score:</strong> {recommendation.score}
          </p>
          <h4 className="mt-4 font-semibold">Fertilizer Needs:</h4>
          <ul className="list-disc list-inside">
            <li>N: {recommendation.fertilizer.n}</li>
            <li>P: {recommendation.fertilizer.p}</li>
            <li>K: {recommendation.fertilizer.k}</li>
          </ul>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HomePage;
