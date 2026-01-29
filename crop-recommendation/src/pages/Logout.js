import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // REMOVE LOGIN TOKEN
    localStorage.removeItem("authToken");

    // Redirect to Landing Page
    setTimeout(() => navigate("/"), 800);
  }, [navigate]);

  return (
    <h2 style={{ textAlign: "center", margin: "3rem" }}>
      You have been logged out.
    </h2>
  );
}
