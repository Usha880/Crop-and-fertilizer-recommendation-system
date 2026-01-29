import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("authToken", "logged-in");
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", email);

      navigate("/home");
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    // ✅ FULL PAGE BACKGROUND FIX
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: dark ? "#1C1E2A" : "#EAF6FF",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 40,
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: dark ? "#26283B" : "#ffffff",
          color: dark ? "#fff" : "#222",
          padding: 36,
          width: "100%",
          maxWidth: 420,
          borderRadius: 12,
          position: "relative",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* THEME TOGGLE */}
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            background: "none",
            border: "none",
            color: dark ? "#ffe066" : "#222",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{
            display: "block",
            width: "100%",
            margin: "10px 0",
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <div style={{ marginBottom: 10 }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((v) => !v)}
          />{" "}
          Show Password
        </div>

        {error && (
          <div
            style={{
              color: "#ff6b6b",
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            marginTop: 16,
            padding: "12px",
            background: "#53a8fa",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        <div style={{ marginTop: 15, textAlign: "center" }}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              background: "#ffe066",
              border: "none",
              borderRadius: 6,
              padding: "7px 16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Register here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
