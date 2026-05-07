import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "./ToastContext";

const SavedContext = createContext(null);

export const SavedProvider = ({ children }) => {
  const [savedIds, setSavedIds] = useState(() => {
    const localData = localStorage.getItem("homlioo_saved");
    return localData ? JSON.parse(localData) : [];
  });
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem("homlioo_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id, name) => {
    setSavedIds((prev) => {
      const isSaved = prev.includes(id);
      if (isSaved) {
        showToast(`${name} removed from favorites`, "info");
        return prev.filter((i) => i !== id);
      } else {
        showToast(`${name} saved to favorites!`, "success");
        return [...prev, id];
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
