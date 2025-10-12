import React from "react";
import bgImage from "../assets/landing-image.jpg";
import { FaLeaf, FaSeedling, FaMoon, FaSun } from "react-icons/fa";

const cardStyle = (dark) => ({
  flex: "1 1 300px",
  margin: "1rem",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: dark
    ? "0 4px 15px rgba(0,0,0,0.8)"
    : "0 4px 15px rgba(0,0,0,0.1)",
  backgroundColor: dark ? "#222" : "#fff",
  color: dark ? "#eee" : "#222",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
});

const iconStyle = {
  fontSize: "4rem",
  marginBottom: "1rem",
  color: "#45C4B0",
};

const LandingPage = ({ onNavigate, dark, toggleTheme }) => {
  return (
    <>
      <header
        style={{
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: dark ? "#222" : "#f5f6fa",
          color: dark ? "#f5f6fa" : "#222",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h1>Crop & Fertilizer Recommendation</h1>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          style={{
            fontSize: "1.5rem",
            padding: "6px 12px",
            background: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            color: dark ? "#f5f6fa" : "#222",
          }}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Section 1: Welcome and Login */}
        <section
          style={{
            scrollSnapAlign: "start",
            height: "100vh",
            padding: "4rem 2rem",
            backgroundColor: dark
              ? "rgba(18,18,18,0.85)"
              : "rgba(255, 255, 255, 0.85)",
            color: dark ? "#eee" : "#222",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2>Welcome to Crop & Fertilizer Recommendation System</h2>
          <p>Modern advice for your farming success—powered by AI.</p>
          <button
            style={{
              margin: "1.5rem",
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              borderRadius: 6,
              border: "none",
              backgroundColor: "#45C4B0",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => onNavigate("login")}
          >
            Get Started (Login)
          </button>
        </section>

        {/* Section 2: Interactive Services cards */}
        <section
          style={{
            scrollSnapAlign: "start",
            minHeight: "100vh",
            padding: "4rem 2rem",
            backgroundColor: dark
              ? "rgba(26,26,26,0.85)"
              : "rgba(240,244,248,0.85)",
            color: dark ? "#eee" : "#222",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Crop Recommendation Card */}
          <div
            style={cardStyle(dark)}
            onClick={() => onNavigate("crop-recommendation")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = dark
                ? "0 8px 20px rgba(0,0,0,1)"
                : "0 8px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = dark
                ? "0 4px 15px rgba(0,0,0,0.8)"
                : "0 4px 15px rgba(0,0,0,0.1)";
            }}
          >
            <FaLeaf style={iconStyle} />
            <h3>Crop Recommendation</h3>
            <p>
              Get AI-powered advice to select the best crops for your soil and region.
            </p>
          </div>

          {/* Fertilizer Recommendation Card */}
          <div
            style={cardStyle(dark)}
            onClick={() => onNavigate("fertilizer-recommendation")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = dark
                ? "0 8px 20px rgba(0,0,0,1)"
                : "0 8px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = dark
                ? "0 4px 15px rgba(0,0,0,0.8)"
                : "0 4px 15px rgba(0,0,0,0.1)";
            }}
          >
            <FaSeedling style={iconStyle} />
            <h3>Fertilizer Recommendation</h3>
            <p>
              Precision fertilizer suggestions to maximize yield and reduce waste.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
