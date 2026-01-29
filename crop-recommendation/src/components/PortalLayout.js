import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const PortalLayout = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(135deg, #232526 0%, #1c92d2 100%)"
          : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        color: dark ? "#eee" : "#222",
      }}
    >
      <Sidebar dark={dark} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 2rem",
          backgroundColor: dark
            ? "rgba(11,11,11,0.85)"
            : "rgba(255,255,255,0.9)",
          borderRadius: "1rem",
          margin: "1rem",
          boxShadow: dark
            ? "0 0 20px rgba(0,0,0,0.6)"
            : "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Navbar dark={dark} toggleTheme={toggleTheme} />

        <main style={{ marginTop: "1rem", flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
