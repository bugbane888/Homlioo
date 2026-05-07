import React, { createContext, useState, useContext, useCallback } from "react";
import { useToast } from "./ToastContext";

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const { showToast } = useToast();

  const toggleCompare = useCallback(
    (pg) => {
      setCompareList((prev) => {
        const isAlreadyAdded = prev.find((item) => item.id === pg.id);

        if (isAlreadyAdded) {
          showToast(`${pg.name} removed from compare.`, "info");
          return prev.filter((item) => item.id !== pg.id);
        }

        if (prev.length >= 3) {
          showToast("You can only compare up to 3 properties.", "error");
          return prev;
        }

        showToast(`${pg.name} added to compare!`, "success");
        return [...prev, pg];
      });
    },
    [showToast],
  );

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider
      value={{ compareList, toggleCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
