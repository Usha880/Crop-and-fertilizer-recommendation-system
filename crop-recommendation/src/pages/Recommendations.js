import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

/* 🌾 Detailed Crop Guidance (Standard Agronomy) */
const CROP_GUIDE = {
  Groundnut: {
    sowing: "June–July (Kharif) or October–November (Rabi)",
    seedRate: "100–120 kg per hectare",
    spacing: "30 cm × 10 cm",
    irrigation: "Critical stages: flowering and pod formation",
    pests: "Leaf miner, red hairy caterpillar",
    mistakes: "Avoid waterlogging and excess nitrogen",
    yield: "20–25 quintals per hectare"
  },
  Cotton: {
    sowing: "June–July",
    seedRate: "2–3 kg per hectare (Bt cotton)",
    spacing: "90 cm × 60 cm",
    irrigation: "Square formation and boll development stages",
    pests: "Pink bollworm, whitefly",
    mistakes: "Do not overuse nitrogen fertilizers",
    yield: "25–30 quintals per hectare"
  },
  Maize: {
    sowing: "June–July or October",
    seedRate: "18–20 kg per hectare",
    spacing: "60 cm × 20 cm",
    irrigation: "Tasseling and silking stages",
    pests: "Stem borer, fall armyworm",
    mistakes: "Avoid delayed nitrogen application",
    yield: "40–50 quintals per hectare"
  },
  Chilli: {
    sowing: "June–July or January–February",
    seedRate: "1–1.5 kg nursery seed per hectare",
    spacing: "60 cm × 45 cm",
    irrigation: "Flowering and fruit formation stages",
    pests: "Thrips, mites",
    mistakes: "Avoid moisture stress during flowering",
    yield: "20–25 quintals per hectare (dry chilli)"
  },
  "Red Gram": {
    sowing: "June–July",
    seedRate: "12–15 kg per hectare",
    spacing: "90 cm × 30 cm",
    irrigation: "Flowering and pod filling stages",
    pests: "Pod borer",
    mistakes: "Avoid dense sowing",
    yield: "15–20 quintals per hectare"
  }
};

export default function Recommendations() {
  const { dark } = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("latestPrediction");
    if (saved) setData(JSON.parse(saved));
  }, []);

  if (!data || !Array.isArray(data.crops)) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2>🌱 Crop Recommendations</h2>
        <p>No recommendation available yet.</p>
        <p>Please submit details in Farmer Portal.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", color: dark ? "#f5f5f5" : "#222" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>
        🌱 Crop-wise Cultivation Guidance
      </h2>

      <p>
        <b>State:</b> Telangana <br />
        <b>District:</b> {data.district}
      </p>

      {data.crops.map((crop, index) => {
        const guide = CROP_GUIDE[crop.name];

        return (
          <div
            key={index}
            style={{
              marginTop: "2rem",
              padding: "1.8rem",
              borderRadius: "14px",
              background: dark ? "#2a2a2a" : "#f7f7f7"
            }}
          >
            <h3>🌾 {crop.name}</h3>
            <p><b>Recommended Fertilizer:</b> {crop.fertilizer}</p>

            {guide ? (
              <>
                <Section title="🌱 Crop Planning" dark={dark}>
                  <p><b>Sowing Time:</b> {guide.sowing}</p>
                  <p><b>Seed Rate:</b> {guide.seedRate}</p>
                  <p><b>Spacing:</b> {guide.spacing}</p>
                </Section>

                <Section title="💧 Irrigation Schedule" dark={dark}>
                  <p>{guide.irrigation}</p>
                </Section>

                <Section title="🐛 Pest & Disease Alert" dark={dark}>
                  <p>{guide.pests}</p>
                </Section>

                <Section title="⚠️ Common Mistakes" dark={dark}>
                  <p>{guide.mistakes}</p>
                </Section>

                <Section title="📈 Expected Yield" dark={dark}>
                  <p>{guide.yield}</p>
                </Section>
              </>
            ) : (
              <p style={{ marginTop: "1rem", color: "#777" }}>
                Standard agronomic practices are recommended for this crop.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* 🧩 Section Component */
const Section = ({ title, children, dark }) => (
  <div
    style={{
      marginTop: "1.2rem",
      padding: "1.3rem",
      borderRadius: "12px",
      background: dark ? "#1f1f1f" : "#ffffff"
    }}
  >
    <h4 style={{ marginBottom: "0.6rem" }}>{title}</h4>
    {children}
  </div>
);
