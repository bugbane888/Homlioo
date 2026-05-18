import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "./ToastContext";

const SavedContext = createContext(null);

export const SavedProvider = ({ children }) => {
  const { showToast } = useToast();

  // Initialize state from LocalStorage
  const [savedIds, setSavedIds] = useState(() => {
    const localData = localStorage.getItem("homlioo_saved");
    return localData ? JSON.parse(localData) : [];
  });

  // Sync state to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("homlioo_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (pg) => {
    setSavedIds((prev) => {
      const isSaved = prev.includes(pg.id);
      if (isSaved) {
        showToast(`${pg.name} removed from favorites`, "info");
        return prev.filter((id) => id !== pg.id);
      } else {
        showToast(`${pg.name} added to favorites! ❤️`, "success");
        return [...prev, pg.id];
      }
    });
  };

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
