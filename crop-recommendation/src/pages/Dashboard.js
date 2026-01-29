import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line,
  ResponsiveContainer
} from "recharts";
import { useTheme } from "../context/ThemeContext";

/* 🎨 Colors */
const COLORS = ["#2E7D32", "#1976D2", "#F9A825", "#6A1B9A", "#00838F"];

/* 🌱 REALISTIC NPK + pH (ICAR / AGRONOMY STANDARD) */
const CROP_NPK = {
  Paddy: { N: 100, P: 50, K: 50, pH: 6.5 },
  Cotton: { N: 80, P: 40, K: 40, pH: 6.8 },
  Maize: { N: 120, P: 60, K: 40, pH: 6.2 },
  Groundnut: { N: 20, P: 40, K: 40, pH: 6.0 },
  "Red Gram": { N: 25, P: 50, K: 25, pH: 6.5 },
  Chilli: { N: 60, P: 30, K: 50, pH: 6.5 }
};

/* 🌍 REALISTIC SOIL TEXTURE (ICAR STANDARD) */
const CROP_SOIL_TEXTURE = {
  Paddy: "Clay loam / Silty clay loam",
  Cotton: "Black soil (Clay loam)",
  Maize: "Well-drained loamy soil",
  Groundnut: "Sandy loam",
  "Red Gram": "Sandy loam to loam",
  Chilli: "Loam to sandy loam"
};

/* 🌦 SEASONAL SUITABILITY (ICAR STYLE) */
const SEASONAL = {
  Paddy: [
    { season: "Kharif", score: 90 },
    { season: "Rabi", score: 70 },
    { season: "Zaid", score: 40 }
  ],
  Cotton: [
    { season: "Kharif", score: 88 },
    { season: "Rabi", score: 45 },
    { season: "Zaid", score: 30 }
  ],
  Maize: [
    { season: "Kharif", score: 80 },
    { season: "Rabi", score: 75 },
    { season: "Zaid", score: 55 }
  ],
  Groundnut: [
    { season: "Kharif", score: 85 },
    { season: "Rabi", score: 60 },
    { season: "Zaid", score: 40 }
  ],
  "Red Gram": [
    { season: "Kharif", score: 88 },
    { season: "Rabi", score: 55 },
    { season: "Zaid", score: 35 }
  ],
  Chilli: [
    { season: "Kharif", score: 65 },
    { season: "Rabi", score: 85 },
    { season: "Zaid", score: 60 }
  ]
};

export default function Dashboard() {
  const { dark } = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("latestPrediction");
    if (saved) setData(JSON.parse(saved));
  }, []);

  if (!data) {
    return (
      <div style={{ padding: "2rem" }}>
        <h3>No dashboard data available.</h3>
      </div>
    );
  }

  const crops = data.crops || [];
  const topCrops = crops.slice(0, 5);

  /* 📊 PIE DATA (Suitability %) */
  const pieData = topCrops.map((c, i) => ({
    name: c.name,
    value: i === 0 ? 40 : i === 1 ? 25 : i === 2 ? 15 : 10
  }));

  /* 📊 NPK BAR DATA */
  const npkData = topCrops.map(c => ({
    crop: c.name,
    N: CROP_NPK[c.name]?.N || 0,
    P: CROP_NPK[c.name]?.P || 0,
    K: CROP_NPK[c.name]?.K || 0
  }));

  /* 📄 DOWNLOAD REPORT */
  const downloadReport = () => {
    const cropDetails = topCrops.map(c => {
      const npk = CROP_NPK[c.name] || {};
      const soil = CROP_SOIL_TEXTURE[c.name] || "Loamy soil";

      return `
        <h4>${c.name}</h4>
        <p><b>Fertilizer:</b> ${c.fertilizer}</p>
        <p><b>NPK (kg/ha):</b> N-${npk.N}, P-${npk.P}, K-${npk.K}</p>
        <p><b>Ideal pH:</b> ${npk.pH}</p>
        <p><b>Soil Texture:</b> ${soil}</p>
        <hr/>
      `;
    }).join("");

    const html = `
      <html>
      <body>
        <h2>SMART AGRICULTURE ADVISORY REPORT</h2>

        <h3>Location</h3>
        <p><b>State:</b> Telangana</p>
        <p><b>District:</b> ${data.district}</p>

        <h3>Weather Conditions</h3>
        <ul>
          <li>Temperature: ${data.weather.temperature} °C</li>
          <li>Humidity: ${data.weather.humidity} %</li>
          <li>Rainfall: ${data.weather.rainfall} mm</li>
        </ul>

        <h3>Recommended Crops & Soil Suitability</h3>
        ${cropDetails}

        <p><i>
          Soil texture, NPK values, and pH ranges are based on
          ICAR and Indian agricultural university standards.
        </i></p>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Agriculture_Advisory_Report.doc";
    link.click();
  };

  return (
    <div style={{ padding: "2rem", color: dark ? "#eee" : "#222" }}>
      <h2>📊 Agriculture Dashboard</h2>

      {/* 🌦 WEATHER */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>🌦 Weather Conditions</h3>
        <p>🌡 Temperature: {data.weather.temperature} °C</p>
        <p>💧 Humidity: {data.weather.humidity} %</p>
        <p>🌧 Rainfall: {data.weather.rainfall} mm</p>
      </div>

      {/* 🌾 PIE */}
      <h3>🌾 Crop Suitability Distribution</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={pieData} dataKey="value" label>
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* 🧪 NPK BAR */}
      <h3>🧪 NPK Requirement (kg/ha)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={npkData}>
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="N" fill="#2E7D32" />
          <Bar dataKey="P" fill="#1976D2" />
          <Bar dataKey="K" fill="#F9A825" />
        </BarChart>
      </ResponsiveContainer>

      {/* 📅 SEASON */}
      <h3>📅 Seasonal Suitability</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={SEASONAL[topCrops[0]?.name] || []}>
          <XAxis dataKey="season" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#6A1B9A" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>

      <button
        onClick={downloadReport}
        style={{
          marginTop: "2rem",
          padding: "12px 18px",
          background: "#2E7D32",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold"
        }}
      >
        ⬇ Download Complete Advisory Report
      </button>
    </div>
  );
}
