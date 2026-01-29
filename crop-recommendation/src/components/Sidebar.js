import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCommentDots,
  FaHome,
  FaUserAlt,
  FaTachometerAlt,
  FaFlask,
  FaMapMarkerAlt,
  FaSearchLocation,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const Sidebar = ({ dark }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const navLinks = [
    { to: "/home", icon: <FaHome />, label: "Home" },
    { to: "/supported-locations", icon: <FaSearchLocation />, label: "Supported Locations" },
    { to: "/farmerportal", icon: <FaUserAlt />, label: "Farmer Portal" },
    { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/recommendations", icon: <FaFlask />, label: "Recommendations" },
    { to: "/feedback", icon: <FaCommentDots />, label: "Feedback" },
  ];

  return (
    <aside
      style={{
        width: collapsed ? 60 : 220,
        background: dark
          ? "rgba(20,23,36,0.95)"
          : "linear-gradient(180deg, #E0EAFC, #CFDEF3)",
        color: dark ? "#fff" : "#222",
        minHeight: "100vh",
        padding: "1rem 0.5rem",
        transition: "width 0.3s",
        boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {!collapsed && (
          <h2 style={{ fontSize: "1.4rem", margin: 0 }}>🌾 Farmer</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            fontSize: "1.3rem",
          }}
        >
          {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>

      {/* Links */}
      <div style={{ marginTop: "1.5rem" }}>
        {navLinks.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.6rem",
              marginBottom: "0.4rem",
              borderRadius: 8,
              textDecoration: "none",
              color: isActive ? "#fff" : "inherit",
              background: isActive ? "#2979FF" : "transparent",
              justifyContent: collapsed ? "center" : "flex-start",
            })}
          >
            {icon}
            {!collapsed && label}
          </NavLink>
        ))}
      </div>

      {!collapsed && (
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            width: "100%",
            background: "#ef476f",
            border: "none",
            color: "#fff",
            padding: "0.6rem",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
