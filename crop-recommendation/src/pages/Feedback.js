import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Feedback() {
  const { dark } = useTheme();

  const [rating, setRating] = useState(0);
  const [emoji, setEmoji] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emojis = [
    { label: "😡 Very Bad", value: "very_bad" },
    { label: "😞 Bad", value: "bad" },
    { label: "😐 Okay", value: "okay" },
    { label: "😊 Good", value: "good" },
    { label: "😍 Excellent", value: "excellent" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !emoji) {
      alert("Please rate your experience 😊");
      return;
    }

    try {
      await fetch("http://127.0.0.1:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
          rating,
          experience: emoji,
          suggestion: message
        })
      });

      setSubmitted(true);
      setRating(0);
      setEmoji("");
      setMessage("");
    } catch (err) {
      alert("Failed to submit feedback");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        background: dark ? "#1f1f1f" : "#ffffff",
        color: dark ? "#f5f5f5" : "#222",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>📝 Farmer Feedback</h2>
      <p style={{ marginBottom: "1.5rem" }}>
        Your feedback helps us improve 🌱
      </p>

      {submitted ? (
        <p style={{ color: "green", fontWeight: "bold" }}>
          ✅ Thank you for your feedback!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* ⭐ Rating */}
          <label style={{ fontWeight: "bold" }}>Rate your experience</label>
          <div style={{ margin: "0.5rem 0 1rem" }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => setRating(num)}
                style={{
                  fontSize: "1.8rem",
                  cursor: "pointer",
                  color: num <= rating ? "#FFD700" : "#999",
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* 😊 Emoji Experience */}
          <label style={{ fontWeight: "bold" }}>
            How was your experience?
          </label>
          <div style={{ margin: "0.5rem 0 1rem" }}>
            {emojis.map((e) => (
              <button
                type="button"
                key={e.value}
                onClick={() => setEmoji(e.value)}
                style={{
                  margin: "0.3rem",
                  padding: "0.4rem 0.7rem",
                  borderRadius: "8px",
                  border:
                    emoji === e.value
                      ? "2px solid #4CAF50"
                      : "1px solid #ccc",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {e.label}
              </button>
            ))}
          </div>

          {/* ✍️ Suggestions */}
          <label style={{ fontWeight: "bold" }}>
            Suggestions / Notes (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Tell us how we can improve..."
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "0.5rem",
              borderRadius: "8px",
            }}
          />

          {/* 📤 Submit */}
          <button
            type="submit"
            style={{
              marginTop: "1.2rem",
              width: "100%",
              padding: "10px",
              fontWeight: "bold",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}
