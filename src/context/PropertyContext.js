import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { propertyService, mapPropertyFromDB } from "../services/supabasePropertyService";
import { LISTINGS_DATA } from "../constants/data";

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch properties from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await propertyService.getAll();
        // Map database rows to frontend format
        let mappedData = data.map(mapPropertyFromDB);
        
        // Merge with local storage fallback items
        const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
        // Only add local properties that don't exist in Supabase (by ID)
        const dbIds = new Set(mappedData.map(p => p.id));
        const mergedLocal = localProps.filter(p => !dbIds.has(p.id));
        
        setProperties([...mergedLocal, ...mappedData]);
      } catch (error) {
        console.error("Error loading properties:", error);
        // Fallback to mock data + local storage if Supabase fails completely
        const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
        setProperties([...localProps, ...LISTINGS_DATA]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();

    // Subscribe to real-time changes
    const subscription = propertyService.subscribeToChanges((payload) => {
      if (payload.eventType === "INSERT") {
        setProperties((prev) => [mapPropertyFromDB(payload.new), ...prev]);
      } else if (payload.eventType === "UPDATE") {
        setProperties((prev) =>
          prev.map((p) =>
            p.id === payload.new.id ? mapPropertyFromDB(payload.new) : p
          )
        );
      } else if (payload.eventType === "DELETE") {
        setProperties((prev) => prev.filter((p) => p.id !== payload.old.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addProperty = useCallback(async (newPg) => {
    try {
      const created = await propertyService.create(newPg);
      const mapped = mapPropertyFromDB(created);
      setProperties((prev) => [mapped, ...prev]);
      return mapped;
    } catch (error) {
      console.error("Error adding property:", error);
      // Fallback to local state
      const formattedPg = {
        ...newPg,
        id: Date.now(),
        verified: true,
        rating: 5.0,
        reviews: 0,
        roomsLeft: 3,
        tags: ["New Listing"],
        amenities: newPg.amenities || ["WiFi", "AC", "CCTV"],
        ownerPhone: newPg.ownerPhone || "",
        coverImage: newPg.coverImage || "",
        galleryImages: newPg.galleryImages || [],
      };
      
      // Save to local storage
      const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
      localProps.unshift(formattedPg);
      localStorage.setItem("homlioo_properties", JSON.stringify(localProps));
      
      setProperties((prev) => [formattedPg, ...prev]);
      return formattedPg;
    }
  }, []);

  const updateProperty = useCallback(async (id, updatedData) => {
    try {
      const updated = await propertyService.update(id, updatedData);
      const mapped = mapPropertyFromDB(updated);
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? mapped : p))
      );
      return mapped;
    } catch (error) {
      console.error("Error updating property:", error);
      // Fallback to local state
      const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
      const updatedLocalProps = localProps.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
      localStorage.setItem("homlioo_properties", JSON.stringify(updatedLocalProps));

      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
    }
  }, []);

  const deleteProperty = useCallback(async (id) => {
    try {
      await propertyService.delete(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
      // Fallback to local state
      const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
      const updatedLocalProps = localProps.filter((p) => p.id !== id);
      localStorage.setItem("homlioo_properties", JSON.stringify(updatedLocalProps));

      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
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
