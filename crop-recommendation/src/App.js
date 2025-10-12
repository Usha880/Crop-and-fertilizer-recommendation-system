import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PortalLayout from "./components/PortalLayout"; // Keep this import

import LandingPage from "./pages/Landingpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerPortal from "./pages/FarmerPortal";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Settings from "./pages/Settings";
import Location from "./pages/Location";
import Logout from "./pages/Logout";

import "./App.css";

// HOC wrapper for navigation and theming
function WrapWithNavigate({ Component, dark, toggleTheme, ...props }) {
  const navigate = useNavigate();
  return (
    <Component
      {...props}
      dark={dark}
      toggleTheme={toggleTheme}
      onNavigate={(page) => navigate(`/${page}`)}
    />
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark((d) => !d);

  return (
    <div className={dark ? "theme-dark" : "theme-light"}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<WrapWithNavigate Component={LandingPage} dark={dark} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/login"
            element={<WrapWithNavigate Component={Login} dark={dark} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/register"
            element={<WrapWithNavigate Component={Register} dark={dark} toggleTheme={toggleTheme} />}
          />

          {/* Protected routes wrapped by PortalLayout */}
          <Route element={<PortalLayout dark={dark} toggleTheme={toggleTheme} />}>
            <Route path="/farmerportal" element={<FarmerPortal />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/location" element={<Location />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
