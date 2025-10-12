import React, { useState } from "react";
const Location = () => {
  const [location, setLocation] = useState("");
  return (
    <section style={{ padding: "2rem" }}>
      <h2>Set Your Location</h2>
      <input
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter your location"
      />
      <button>Save Location</button>
    </section>
  );
};
export default Location;
