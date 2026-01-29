import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appSettings"));
    if (saved) {
      setDark(saved.dark ?? false);
      setLanguage(saved.language ?? "en");
    }
  }, []);

  const toggleTheme = () => {
    const updated = !dark;
    setDark(updated);
    saveSettings(updated, language);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    saveSettings(dark, lang);
  };

  const saveSettings = (darkMode, lang) => {
    localStorage.setItem(
      "appSettings",
      JSON.stringify({ dark: darkMode, language: lang })
    );
  };

  return (
    <AppContext.Provider
      value={{ dark, toggleTheme, language, changeLanguage }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
