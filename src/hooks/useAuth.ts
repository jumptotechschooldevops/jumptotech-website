"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mock user for frontend demo
    const storedUser = localStorage.getItem("mock_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setMounted(true);
  }, []);

  const login = (email: string, full_name?: string) => {
    const newUser = { email, user_metadata: { full_name } };
    localStorage.setItem("mock_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = async () => {
    localStorage.removeItem("mock_user");
    setUser(null);
  };

  const role = user?.email?.includes("admin") ? "admin" : (user ? "student" : "visitor");

  return {
    user,
    loggedIn: !!user,
    displayName: user?.user_metadata?.full_name as string | undefined,
    mounted,
    login,
    logout,
    role,
    authMounted: mounted,
  };
}
