// src/pages/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // Cleanup logic (tokens, etc.)
    setTimeout(() => navigate("/login"), 1200);
  }, [navigate]);
  return <h2 style={{ textAlign: "center", margin: "3rem" }}>You have been logged out.</h2>;
}
