// DashboardLayout.js
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, dark, toggleTheme }) => {
  return (
    <div className="dashboard-layout" style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar dark={dark} toggleTheme={toggleTheme} />
        <main style={{ padding: 20, flexGrow: 1 }}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
