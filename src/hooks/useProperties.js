import { useState, useCallback } from "react";
import { LISTINGS_DATA } from "../constants/data";

export const useProperties = () => {
  const [properties, setProperties] = useState(LISTINGS_DATA);

  const addProperty = useCallback((newPg) => {
    setProperties((prev) => [
      { ...newPg, id: prev.length + 1, verified: true },
      ...prev,
    ]);
  }, []);

  const deleteProperty = useCallback((id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateProperty = useCallback((id, updatedData) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
    );
  }, []);

  return {
    properties,
    addProperty,
    deleteProperty,
    updateProperty,
    totalCount: properties.length,
  };
};
