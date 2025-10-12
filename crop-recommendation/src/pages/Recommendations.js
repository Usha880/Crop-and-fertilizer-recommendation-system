import React, { useState } from "react";
const Recommendations = () => {
  const [soil, setSoil] = useState("");
  return (
    <div>
      <h2>Get Crop & Fertilizer Advice</h2>
      <input value={soil} onChange={e => setSoil(e.target.value)} placeholder="Enter soil details..." />
      <button>Recommend</button>
    </div>
  );
};
export default Recommendations;
