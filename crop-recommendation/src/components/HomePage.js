import React from "react";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { dark } = useTheme();

  const cards = [
    {
      title: "Crop Recommendation",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      desc:
        "AI-powered crop recommendations based on soil nutrients, climate patterns, and geographical conditions.",
    },
    {
      title: "Fertilizer Recommendation",
      image: "https://images.unsplash.com/photo-1582515073490-39981397c445",
      desc:
        "Smart fertilizer guidance to improve yield, reduce waste, and support sustainable farming.",
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: "bold",
            color: dark ? "#ffffff" : "#111111",
          }}
        >
          Crop & Fertilizer Recommendation System
        </h1>

        <p
          style={{
            marginTop: 12,
            fontSize: "1.1rem",
            color: dark ? "#f1f1f1" : "#333333",
          }}
        >
          Helping farmers make informed decisions using AI-driven insights.
        </p>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              width: 260,
              height: 340,
              borderRadius: 16,
              background: dark ? "#1e2433" : "#ffffff",
              boxShadow: "0 10px 35px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 160,
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div style={{ padding: "1.2rem", textAlign: "center" }}>
              <h3 style={{ color: dark ? "#ffffff" : "#000000" }}>
                {card.title}
              </h3>

              <p style={{ color: dark ? "#cfd8dc" : "#555555" }}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* WHY SECTION */}
      <section
        style={{
          marginTop: "4rem",
          padding: "2.5rem",
          borderRadius: 16,
          background: dark ? "#1b2030" : "#f3f6fb",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: dark ? "#ffffff" : "#111111" }}>
          Why Our System is Useful
        </h2>

        <p
          style={{
            maxWidth: 900,
            margin: "1rem auto 0",
            lineHeight: 1.7,
            color: dark ? "#cfd8dc" : "#333333",
          }}
        >
          This system analyzes soil properties, climate data, and regional
          factors using machine learning models to recommend the most suitable
          crops and fertilizers. It helps farmers increase productivity, reduce
          unnecessary costs, and adopt sustainable, data-driven agricultural
          practices.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
