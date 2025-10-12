// src/components/ThemeToggle.js
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({ dark, toggle }) {
  return (
    <button onClick={toggle} aria-label="Toggle Dark/Light Theme" style={{
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      color: "inherit",
      margin: "8px"
    }}>
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
