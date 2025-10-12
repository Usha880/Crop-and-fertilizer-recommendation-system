import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Login = ({ onNavigate, dark, toggleTheme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation example
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    // Clear errors and navigate
    setError("");
    onNavigate("farmerportal");
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        background: dark ? "#1C1E2A" : "#EAF6FF",
        color: dark ? "#fff" : "#222",
        padding: 36,
        maxWidth: 420,
        margin: "40px auto",
        borderRadius: 12,
        position: "relative",
      }}
    >
      {/* Theme Toggle */}
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
          fontSize: "1.5rem",
        }}
        aria-label="Toggle theme"
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>

      <h2 style={{ textAlign: "center" }}>Login</h2>
      <label>Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
      </label>
      <label>Password
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
      </label>
      <div style={{ marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((v) => !v)}
        />{" "}
        Show Password
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: 10, fontWeight: "bold" }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        style={{
          marginTop: 16,
          padding: "10px 28px",
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
          onClick={() => onNavigate("register")}
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
  );
};

export default Login;
