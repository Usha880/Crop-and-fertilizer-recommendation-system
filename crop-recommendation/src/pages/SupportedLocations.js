import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function SupportedLocations() {
  const { dark } = useTheme();
  const [locations, setLocations] = useState({});
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/supported_locations.json")
      .then(res => res.json())
      .then(setLocations);
  }, []);

  const states = Object.keys(locations);
  const districts = state ? Object.keys(locations[state]) : [];

  const resetForm = () => {
    setState("");
    setDistrict("");
    setChecked(false);
  };

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "600px",
      margin: "auto",
      background: dark ? "#2a2a2a" : "#fff",
      borderRadius: "12px"
    }}>
      <h2>📍 Supported Locations</h2>

      {/* STATE */}
      <select
        value={state}
        onChange={e => {
          setState(e.target.value);
          setDistrict("");
          setChecked(false);
        }}
      >
        <option value="">Select State</option>
        {states.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <br /><br />

      {/* DISTRICT */}
      {state && (
        <select
          value={district}
          onChange={e => {
            setDistrict(e.target.value);
            setChecked(false);
          }}
        >
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      )}

      <br /><br />

      {/* CHECK SUPPORT BUTTON */}
      {state && district && !checked && (
        <button onClick={() => setChecked(true)}>
          ✅ Check Support
        </button>
      )}

      {/* RESULT */}
      {checked && (
        <>
          <p style={{ marginTop: "1rem", color: "green", fontWeight: "bold" }}>
            ✅ {district}, {state} is supported for crop recommendations
          </p>

          <button onClick={resetForm} style={{ marginTop: "10px" }}>
            🔄 Check Another Location
          </button>
        </>
      )}
    </div>
  );
}
