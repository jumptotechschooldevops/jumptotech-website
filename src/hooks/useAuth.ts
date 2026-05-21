"use client";

import { useState, useEffect } from "react";

const AUTH_KEY = "jtt_auth";

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoggedIn(localStorage.getItem(AUTH_KEY) === "true");
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === "student" && password === "jumptotech2026") {
      localStorage.setItem(AUTH_KEY, "true");
      setLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setLoggedIn(false);
  };

  return { loggedIn, login, logout, mounted };
}
