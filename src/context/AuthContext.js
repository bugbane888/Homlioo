import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import authService from "../services/supabaseAuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          const profile = await authService.getProfile(session.user.id);
          setUser({
            id: session.user.id,
            name: profile?.name || session.user.email.split("@")[0],
            email: session.user.email,
            role: profile?.role || "user",
            phone: profile?.phone || "",
            photo: profile?.photo_url || null,
          });
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          try {
            const profile = await authService.getProfile(session.user.id);
            setUser({
              id: session.user.id,
              name: profile?.name || session.user.email.split("@")[0],
              email: session.user.email,
              role: profile?.role || "user",
              phone: profile?.phone || "",
              photo: profile?.photo_url || null,
            });
          } catch (error) {
            // Profile might not exist yet, use basic info
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email.split("@")[0],
              email: session.user.email,
              role: session.user.user_metadata?.role || "user",
              phone: "",
              photo: null,
            });
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { user: authUser } = await authService.signIn(email, password);
      if (authUser) {
        const profile = await authService.getProfile(authUser.id);
        const userData = {
          id: authUser.id,
          name: profile?.name || authUser.email.split("@")[0],
          email: authUser.email,
          role: profile?.role || "user",
          phone: profile?.phone || "",
          photo: profile?.photo_url || null,
        };
        setUser(userData);
        return { success: true, role: userData.role, name: userData.name };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, name) => {
    try {
      await authService.signUp(email, password, name);
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updatedData) => {
    if (!user?.id) return;
    try {
      const profile = await authService.updateProfile(user.id, {
        name: updatedData.name,
        phone: updatedData.phone,
        photo_url: updatedData.photo,
      });
      setUser((prev) => ({
        ...prev,
        name: profile.name,
        phone: profile.phone,
        photo: profile.photo_url,
      }));
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
