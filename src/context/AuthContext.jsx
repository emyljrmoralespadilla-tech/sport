// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user_v1");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user_v1", JSON.stringify(user));
    else localStorage.removeItem("user_v1");
  }, [user]);

  const login = async (email, password) => {
    const found = await loginUser(email, password);
    if (found) {
      setUser(found);
      return { ok: true, user: found };
    }
    return { ok: false, error: "Credenciales inválidas" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

