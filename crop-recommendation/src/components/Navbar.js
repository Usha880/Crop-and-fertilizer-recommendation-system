import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ dark, toggleTheme }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: dark ? "#121212" : "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        color: dark ? "#eee" : "#222",
      }}
    >
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
          color: dark ? "#f5c518" : "#444",
          transition: "color 0.3s",
        }}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
