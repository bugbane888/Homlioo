import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { LISTINGS_DATA } from "../constants/data";

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation of an API fetch from your future Node.js backend
  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setProperties(LISTINGS_DATA);
        setIsLoading(false);
      }, 1000); // 1-second delay for Skeleton loading effect
    };
    loadData();
  }, []);

  const addProperty = useCallback((newPg) => {
    const formattedPg = {
      ...newPg,
      id: Date.now(),
      verified: true,
      rating: 5.0,
      reviews: 0,
      roomsLeft: 3,
      tags: ["New Listing"],
      amenities: newPg.amenities || ["WiFi", "AC", "CCTV"],
    };
    setProperties((prev) => [formattedPg, ...prev]);
  }, []);

  const updateProperty = useCallback((id, updatedData) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
    );
  }, []);

  const deleteProperty = useCallback((id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        isLoading,
        addProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context)
    throw new Error("useProperties must be used within PropertyProvider");
  return context;
};
