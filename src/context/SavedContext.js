import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useToast } from "./ToastContext";
import { useAuth } from "./AuthContext";
import { favoritesService } from "../services/supabaseFavoritesService";

const SavedContext = createContext(null);

const isDev = process.env.NODE_ENV === "development";
const devError = (...a) => isDev && console.error(...a);

export const SavedProvider = ({ children }) => {
  const { showToast } = useToast();
  const { user } = useAuth();

  // Issue 17 fix: normalize all IDs to strings so numeric Supabase bigints
  // and local Date.now() IDs both match correctly via Array.includes()
  const normalizeId = (id) => String(id);

  const [savedIds, setSavedIds] = useState(() => {
    const localData = localStorage.getItem("homlioo_saved");
    const parsed = localData ? JSON.parse(localData) : [];
    return parsed.map(normalizeId); // normalize on load
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync with Supabase when user logs in
  useEffect(() => {
    const loadFavorites = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const favorites = await favoritesService.getAll(user.id);
          const normalized = favorites.map(normalizeId);
          setSavedIds(normalized);
          localStorage.setItem("homlioo_saved", JSON.stringify(normalized));
        } catch (error) {
          devError("Error loading favorites:", error);
          // Keep localStorage data as fallback
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadFavorites();
  }, [user?.id]);

  // Persist to localStorage whenever savedIds changes
  useEffect(() => {
    localStorage.setItem("homlioo_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = useCallback(async (pg) => {
    const pgId = normalizeId(pg.id);
    const isSaved = savedIds.includes(pgId);

    // Optimistic update
    if (isSaved) {
      setSavedIds((prev) => prev.filter((id) => id !== pgId));
      showToast(`${pg.name} removed from favorites`, "info");
    } else {
      setSavedIds((prev) => [...prev, pgId]);
      showToast(`${pg.name} added to favorites! ❤️`, "success");
    }

    // Sync with Supabase if user is authenticated
    if (user?.id) {
      try {
        await favoritesService.toggle(user.id, pg.id);
      } catch (error) {
        devError("Error syncing favorite:", error);
        // Revert optimistic update on error
        if (isSaved) {
          setSavedIds((prev) => [...prev, pgId]);
        } else {
          setSavedIds((prev) => prev.filter((id) => id !== pgId));
        }
        showToast("Failed to update favorites. Please try again.", "error");
      }
    }
  }, [savedIds, user?.id, showToast]);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isLoading }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
