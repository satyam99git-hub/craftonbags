import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { signOut } from "firebase/auth";

import {
  getFirebaseAuth,
  isFirebaseConfigured,
} from "../config/firebase";
import {
  getCurrentUser,
  logoutUser,
  refreshSession,
} from "../features/auth/authAPI";
import {
  clearAuth,
  getStoredAuth,
  saveAuth,
} from "../features/auth/authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({
  children,
}) => {
  const [auth, setAuth] = useState(() =>
    getStoredAuth()
  );
  const [loading, setLoading] =
    useState(true);

  const syncAuth = useCallback(async () => {
    try {
      const response =
        await getCurrentUser();

      saveAuth(response.data);
      setAuth(response.data);
    } catch {
      clearAuth();
      setAuth(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncAuth();
  }, [syncAuth]);

  useEffect(() => {
    const handleAuthChange = () => {
      setAuth(getStoredAuth());
    };

    window.addEventListener(
      "auth-change",
      handleAuthChange
    );
    window.addEventListener(
      "storage",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange
      );
      window.removeEventListener(
        "storage",
        handleAuthChange
      );
    };
  }, []);

  const refresh = useCallback(async () => {
    const response =
      await refreshSession();

    saveAuth(response.data);
    setAuth(response.data);

    return response.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      if (isFirebaseConfigured) {
        const firebaseAuth = getFirebaseAuth();
        if (firebaseAuth) {
          await signOut(firebaseAuth).catch(() => {});
        }
      }

      clearAuth();
      setAuth(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      auth,
      loading,
      user: auth?.user || null,
      isAuthenticated: Boolean(auth?.user),
      refresh,
      syncAuth,
      logout,
    }),
    [auth, loading, logout, refresh, syncAuth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
