import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Register = ({ onNavigate, dark, toggleTheme }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => email.endsWith("@gmail.com");
  const validatePassword = (p) =>
    /[a-z]/.test(p) &&
    /[A-Z]/.test(p) &&
    /\d/.test(p) &&
    /[^A-Za-z0-9]/.test(p) &&
    p.length >= 8;

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Email must end with @gmail.com");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must include upper, lower, number, special char and be 8+ chars"
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    alert("Registration successful! Please login.");
    onNavigate("login");
  };

  return (
    <form
      onSubmit={handleRegister}
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

      <h2 style={{ textAlign: "center" }}>Register</h2>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@gmail.com"
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
      </label>
      <label>
        Password
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
      </label>
      <label>
        Confirm Password
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", margin: "10px 0" }}
        />
      </label>
      <div>
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
          marginTop: 15,
          background: "#53a8fa",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px 24px",
          width: "100%",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Register
      </button>
      <button
        type="button"
        onClick={() => onNavigate("login")}
        style={{
          marginTop: 12,
          marginLeft: 0,
          background: "#ffe066",
          border: "none",
          borderRadius: 6,
          padding: "7px 20px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold",
        }}
      >
        Already have an account? Login
      </button>
    </form>
  );
};

export default Register;
