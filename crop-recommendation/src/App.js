import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import PortalLayout from "./components/PortalLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/Landingpage";
import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import FarmerPortal from "./pages/FarmerPortal";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Feedback from "./pages/Feedback";
import SupportedLocations from "./pages/SupportedLocations";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            {/* PORTAL LAYOUT ROUTES */}
            <Route element={<PortalLayout />}>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmerportal"
                element={
                  <ProtectedRoute>
                    <FarmerPortal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recommendations"
                element={
                  <ProtectedRoute>
                    <Recommendations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <ProtectedRoute>
                    <Feedback />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/supported-locations"
                element={
                  <ProtectedRoute>
                    <SupportedLocations />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
