import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { supabase } from '../lib/supabase';
import { propertyService, mapPropertyFromDB } from "../services/supabasePropertyService";
import { LISTINGS_DATA } from "../constants/data";

const PropertyContext = createContext(null);

const isDev = process.env.NODE_ENV === 'development';
const devLog = (...a) => isDev && console.log(...a);
const devError = (...a) => isDev && console.error(...a);
const devWarn = (...a) => isDev && console.warn(...a);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Load properties on mount ─────────────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        devLog("[PropertyContext] Loading published properties from Supabase...");
        // Only fetch published properties for the public listing context.
        // The admin panel uses its own separate fetch via getAllAdmin.
        const data = await propertyService.getAll();
        const mappedData = data.map(mapPropertyFromDB);
        devLog("[PropertyContext] Loaded", mappedData.length, "published properties");

        // Merge with any local-storage-only properties (fallback data that isn't in Supabase yet)
        const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
        const dbIds = new Set(mappedData.map((p) => String(p.id)));
        const mergedLocal = localProps.filter((p) => !dbIds.has(String(p.id)));

        setProperties([...mergedLocal, ...mappedData]);
      } catch (error) {
        devError("[PropertyContext] Error loading properties:", error);
        // Full fallback: use localStorage + mock data when Supabase is unavailable
        const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
        setProperties([...localProps, ...LISTINGS_DATA]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // ── Real-time subscription ────────────────────────────────────────────
    const subscription = propertyService.subscribeToChanges((payload) => {
      devLog("[PropertyContext] Real-time event:", payload.eventType, payload.new?.id);

      if (payload.eventType === "INSERT") {
        const newProp = mapPropertyFromDB(payload.new);
        // Only add published properties to the public listing
        if (newProp.status === "published") {
          setProperties((prev) => {
            // Bug 4 fix: deduplicate — if it's already in state (from addProperty optimistic update), replace it
            const exists = prev.some((p) => String(p.id) === String(newProp.id));
            if (exists) {
              return prev.map((p) => (String(p.id) === String(newProp.id) ? newProp : p));
            }
            return [newProp, ...prev];
          });
        }
      } else if (payload.eventType === "UPDATE") {
        const updatedProp = mapPropertyFromDB(payload.new);
        setProperties((prev) => {
          // If status changed to draft, remove from public listing
          if (updatedProp.status !== "published") {
            return prev.filter((p) => String(p.id) !== String(updatedProp.id));
          }
          // Otherwise update in place
          const exists = prev.some((p) => String(p.id) === String(updatedProp.id));
          if (!exists) return [updatedProp, ...prev]; // newly published
          return prev.map((p) => (String(p.id) === String(updatedProp.id) ? updatedProp : p));
        });
      } else if (payload.eventType === "DELETE") {
        setProperties((prev) =>
          prev.filter((p) => String(p.id) !== String(payload.old.id))
        );
      }
    });

    return () => {
      // Issue 6 fix: properly remove the channel to prevent leaks on re-subscriptions
      supabase.removeChannel(subscription);
    };
  }, []);

  // ── addProperty ───────────────────────────────────────────────────────────
  const addProperty = useCallback(async (newPg) => {
    try {
      devLog("[PropertyContext] Creating property in Supabase...", newPg.name);
      const created = await propertyService.create(newPg);
      const mapped = mapPropertyFromDB(created);
      devLog("[PropertyContext] Property created, id=", mapped.id);

      // Bug 4 fix: DON'T add to state here when Supabase succeeded — the real-time
      // subscription INSERT event will handle it (with deduplication). This prevents duplicates.
      // However, if real-time is slow, we do an optimistic update that will be deduped on arrival.
      if (mapped.status === "published") {
        setProperties((prev) => {
          const exists = prev.some((p) => String(p.id) === String(mapped.id));
          if (exists) return prev;
          return [mapped, ...prev];
        });
      }

      return mapped;
    } catch (error) {
      devError("[PropertyContext] Error adding property to Supabase:", error);
      // Fallback: save to localStorage so the admin doesn't lose the data
      const formattedPg = {
        ...newPg,
        id: newPg.id || Date.now(),
        verified: newPg.isVerified ?? true,
        rating: parseFloat(newPg.rating) || 5.0,
        reviews: 0,
        roomsLeft: newPg.roomsLeft || 3,
        tags: newPg.tags || ["New Listing"],
        amenities: newPg.amenities || [],
        ownerPhone: newPg.ownerPhone || "",
        coverImage: newPg.coverImage || "",
        galleryImages: Array.isArray(newPg.galleryImages) ? newPg.galleryImages : [],
        rooms: newPg.rooms || null,
        electricity: newPg.electricity ?? null,
        status: newPg.status || "published",
      };

      const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
      // Deduplicate before adding
      const filtered = localProps.filter((p) => String(p.id) !== String(formattedPg.id));
      filtered.unshift(formattedPg);
      localStorage.setItem("homlioo_properties", JSON.stringify(filtered));

      if (formattedPg.status === "published") {
        setProperties((prev) => {
          const exists = prev.some((p) => String(p.id) === String(formattedPg.id));
          if (exists) return prev.map((p) => String(p.id) === String(formattedPg.id) ? formattedPg : p);
          return [formattedPg, ...prev];
        });
      }

      return formattedPg;
    }
  }, []);

  // ── updateProperty ────────────────────────────────────────────────────────
  const updateProperty = useCallback(async (id, updatedData) => {
    try {
      devLog("[PropertyContext] Updating property id=", id, "in Supabase...");
      const updated = await propertyService.update(id, updatedData);
      const mapped = mapPropertyFromDB(updated);
      devLog("[PropertyContext] Property updated, id=", id);

      setProperties((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? mapped : p))
      );
      return mapped;
    } catch (error) {
      devError("[PropertyContext] Error updating property:", error);
      // Fallback: update localStorage
      const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
      const updatedLocalProps = localProps.map((p) =>
        String(p.id) === String(id) ? { ...p, ...updatedData } : p
      );
      localStorage.setItem("homlioo_properties", JSON.stringify(updatedLocalProps));

      setProperties((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, ...updatedData } : p))
      );

      // Re-throw so the admin UI knows it failed in Supabase
      throw error;
    }
  }, []);

  // ── deleteProperty ────────────────────────────────────────────────────────
  const deleteProperty = useCallback(async (id) => {
    const localProps = JSON.parse(localStorage.getItem("homlioo_properties") || "[]");
    const isLocalOnly = localProps.some((p) => String(p.id) === String(id));

    try {
      await propertyService.delete(id);
      devLog("[PropertyContext] Deleted property id=", id, "from Supabase");
    } catch (error) {
      if (!isLocalOnly) {
        // Property exists in Supabase but delete failed — re-throw so UI can show the error
        throw error;
      }
      devWarn("[PropertyContext] Supabase delete skipped (local-only property):", id);
    }

    // Always clean localStorage
    if (isLocalOnly) {
      const updated = localProps.filter((p) => String(p.id) !== String(id));
      localStorage.setItem("homlioo_properties", JSON.stringify(updated));
    }

    // Always remove from React state
    setProperties((prev) => prev.filter((p) => String(p.id) !== String(id)));
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
