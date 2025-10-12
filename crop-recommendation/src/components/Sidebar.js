import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserAlt, FaTachometerAlt, FaFlask, FaMapMarkerAlt, FaCog } from "react-icons/fa";

const Sidebar = ({ dark }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear auth token or session
    navigate("/login"); // redirect to login page
  };

  const navLinks = [
    { to: "/", icon: <FaHome />, label: "Home" },               // Landing Page
    { to: "/farmerportal", icon: <FaUserAlt />, label: "Farmer Portal" },
    { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/recommendations", icon: <FaFlask />, label: "Recommendations" },
    { to: "/location", icon: <FaMapMarkerAlt />, label: "Location" },
    { to: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <aside
      style={{
        width: 220,
        background: dark
          ? "rgba(20, 23, 36, 0.95)"
          : "linear-gradient(180deg, #E0EAFC 0%, #CFDEF3 100%)",
        color: dark ? "#fff" : "#222",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        boxShadow: "2px 0 12px rgba(31,38,135,0.06)",
        borderRadius: "0 20px 20px 0",
        zIndex: 1,
        padding: "1.5rem 1rem",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          marginBottom: "2rem",
          fontSize: "1.8rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem"
        }}
      >
        🌾 Farmer Panel
      </div>

      {navLinks.map(({ to, icon, label }) => (
        <NavLink
          to={to}
          key={to}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            padding: "0.7rem 1rem",
            borderRadius: "8px",
            margin: "0.2rem 0",
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: isActive ? "#2979FF" : "transparent",
            color: isActive ? "#fff" : "inherit",
            transition: "background-color 0.3s",
          })}
        >
          {icon} {label}
        </NavLink>
      ))}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          background: "#ef476f",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "0.6rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(31,38,135,0.13)",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#d83963")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#ef476f")}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
