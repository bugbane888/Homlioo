import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check local storage or system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("homlioo_theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove both just in case
    root.classList.remove("light", "dark");
    // Add current
    root.classList.add(theme);

    localStorage.setItem("homlioo_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
