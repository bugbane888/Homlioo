import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import authService from "../services/supabaseAuthService";

const AuthContext = createContext(null);

/**
 * Shared timeout helper — wraps any promise and rejects if it takes longer
 * than `ms` milliseconds. Used on every Supabase call so the UI never hangs
 * indefinitely when the backend is slow, paused, or unreachable.
 */
const withTimeout = (promise, ms = 12000) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              "Connection timed out. The server is not responding. Please try again."
            )
          ),
        ms
      )
    ),
  ]);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const initAuth = async () => {
      try {
        const session = await withTimeout(authService.getSession());
        if (session?.user) {
          try {
            const profile = await withTimeout(authService.getProfile(session.user.id));
            setUser({
              id: session.user.id,
              name: profile?.name || session.user.email.split("@")[0],
              email: session.user.email,
              role: profile?.role || "user",
              phone: profile?.phone || "",
              photo: profile?.photo_url || null,
            });
          } catch {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email.split("@")[0],
              email: session.user.email,
              role: session.user.user_metadata?.role || "user",
              phone: "",
              photo: null,
            });
          }
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes (covers email verification, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (
          (event === "SIGNED_IN" ||
            event === "TOKEN_REFRESHED" ||
            event === "USER_UPDATED") &&
          session?.user
        ) {
          try {
            const profile = await withTimeout(authService.getProfile(session.user.id));
            setUser((prev) => ({
              id: session.user.id,
              name: profile?.name || prev?.name || session.user.email.split("@")[0],
              email: session.user.email,
              role: profile?.role || prev?.role || "user",
              phone: profile?.phone || prev?.phone || "",
              photo: profile?.photo_url || prev?.photo || null,
            }));
          } catch {
            // Profile might not exist yet or network failed — preserve existing role
            setUser((prev) => ({
              id: session.user.id,
              name: prev?.name || session.user.user_metadata?.name || session.user.email.split("@")[0],
              email: session.user.email,
              role: prev?.role || session.user.user_metadata?.role || "user",
              phone: prev?.phone || "",
              photo: prev?.photo || null,
            }));
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
        // PASSWORD_RECOVERY: no user state change — ResetPassword page handles it
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { user: authUser } = await withTimeout(authService.signIn(email, password));
      if (authUser) {
        try {
          const profile = await withTimeout(authService.getProfile(authUser.id));
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
        } catch {
          const userData = {
            id: authUser.id,
            name: authUser.user_metadata?.name || authUser.email.split("@")[0],
            email: authUser.email,
            role: authUser.user_metadata?.role || "user",
            phone: "",
            photo: null,
          };
          setUser(userData);
          return { success: true, role: userData.role, name: userData.name };
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, name) => {
    try {
      await withTimeout(authService.signUp(email, password, name));
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updatedData) => {
    if (!user?.id) return;
    try {
      const profile = await withTimeout(
        authService.updateProfile(user.id, {
          name: updatedData.name,
          phone: updatedData.phone,
          photo_url: updatedData.photo,
        })
      );
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
      await withTimeout(authService.signOut());
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  };

  const changePassword = async (newPassword) => {
    try {
      await withTimeout(authService.updatePassword(newPassword));
      return { success: true };
    } catch (error) {
      console.error("Change password error:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, updateProfile, changePassword }}
    >
      {loading ? (
        <div className="h-screen flex flex-col items-center justify-center bg-[#F8F7F4] dark:bg-slate-900">
          <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">
            HOMLiOO Security Loading...
          </p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
