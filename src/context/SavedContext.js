import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useToast } from "./ToastContext";
import { useAuth } from "./AuthContext";
import { favoritesService } from "../services/supabaseFavoritesService";

const SavedContext = createContext(null);

export const SavedProvider = ({ children }) => {
  const { showToast } = useToast();
  const { user } = useAuth();

  // Initialize state from LocalStorage for non-authenticated users
  const [savedIds, setSavedIds] = useState(() => {
    const localData = localStorage.getItem("homlioo_saved");
    return localData ? JSON.parse(localData) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync with Supabase when user logs in
  useEffect(() => {
    const loadFavorites = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const favorites = await favoritesService.getAll(user.id);
          setSavedIds(favorites);
          // Also update localStorage
          localStorage.setItem("homlioo_saved", JSON.stringify(favorites));
        } catch (error) {
          console.error("Error loading favorites:", error);
          // Keep localStorage data as fallback
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadFavorites();
  }, [user?.id]);

  // Sync state to LocalStorage whenever it changes (for non-authenticated users)
  useEffect(() => {
    localStorage.setItem("homlioo_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = useCallback(async (pg) => {
    const isSaved = savedIds.includes(pg.id);
    
    // Optimistic update
    if (isSaved) {
      setSavedIds((prev) => prev.filter((id) => id !== pg.id));
      showToast(`${pg.name} removed from favorites`, "info");
    } else {
      setSavedIds((prev) => [...prev, pg.id]);
      showToast(`${pg.name} added to favorites! ❤️`, "success");
    }

    // Sync with Supabase if user is authenticated
    if (user?.id) {
      try {
        await favoritesService.toggle(user.id, pg.id);
      } catch (error) {
        console.error("Error syncing favorite:", error);
        // Revert optimistic update on error
        if (isSaved) {
          setSavedIds((prev) => [...prev, pg.id]);
        } else {
          setSavedIds((prev) => prev.filter((id) => id !== pg.id));
        }
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
