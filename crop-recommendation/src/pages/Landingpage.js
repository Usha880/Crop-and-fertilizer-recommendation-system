/*
import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/landing-image.jpg";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  return (
    <>
      {/* HEADER */
      /*
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
        <h1>Crop and Fertilizer Recommendation System</h1>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          style={{
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
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
        <section
          style={{
            scrollSnapAlign: "start",
            height: "100vh",
            padding: "2rem",
            backgroundColor: dark
              ? "rgba(18,18,18,0.7)"
              : "rgba(255,255,255,0.7)",
            color: dark ? "#eee" : "#222",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Crop and Fertilizer Recommendation System
          </h2>
          <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
            Modern advice for your farming success — powered by AI.
          </p>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#45C4B0",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Get Started (Login)
          </button>

          <p style={{ marginTop: "1rem" }}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              style={{
                background: "#ffe066",
                border: "none",
                borderRadius: 6,
                padding: "5px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Register
            </button>
          </p>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
*/


import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/landing-image.jpg"; // Make sure you have this image in your assets folder
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  return (
    <>
      {/* HEADER */}
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
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
          Crop & Fertilizer Recommendation System
        </h1>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          style={{
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: dark ? "#f5f6fa" : "#222",
          }}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      {/* MAIN SECTION */}
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section
          style={{
            height: "100vh",
            padding: "2rem",
            backgroundColor: dark
              ? "rgba(18,18,18,0.7)"
              : "rgba(255,255,255,0.7)",
            color: dark ? "#eee" : "#222",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Crop & Fertilizer Recommendation System
          </h2>
          <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
            Modern advice for your farming success — powered by AI.
          </p>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#45C4B0",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Get Started (Login)
          </button>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
