import React, { useState } from "react";
const Settings = () => {
  const [theme, setTheme] = useState("light");
  return (
    <section style={{ padding: "2rem" }}>
      <h2>Settings</h2>
      <label>
        Theme:
        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <button>Save Preferences</button>
    </section>
  );
};
export default Settings;
