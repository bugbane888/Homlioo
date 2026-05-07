import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ADMIN_CRED = { email: "admin@homlioo.com", pass: "adminpghandler" };

  useEffect(() => {
    const saved = localStorage.getItem("homlioo_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email === ADMIN_CRED.email && password === ADMIN_CRED.pass) {
      const data = { name: "Super Admin", role: "admin", email };
      setUser(data);
      localStorage.setItem("homlioo_user", JSON.stringify(data));
      return { success: true, role: "admin", name: data.name };
    }
    const data = { name: email.split("@")[0], role: "user", email };
    setUser(data);
    localStorage.setItem("homlioo_user", JSON.stringify(data));
    return { success: true, role: "user", name: data.name };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("homlioo_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
