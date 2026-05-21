// Provides reusable authentication state and helper actions to components.
import { useEffect, useState } from "react";

import {
  getCurrentUser,
  logoutUser,
} from "../features/auth/authAPI";
import {
  clearAuth,
  getStoredAuth,
  saveAuth,
} from "../features/auth/authStorage";

const useAuth = () => {
  const [auth, setAuth] = useState(() =>
    getStoredAuth()
  );
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncAuth = async () => {
      try {
        const response =
          await getCurrentUser();

        if (!isMounted) return;

        saveAuth(response.data);
        setAuth(response.data);
      } catch {
        if (!isMounted) return;

        clearAuth();
        setAuth(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    syncAuth();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      clearAuth();
      setAuth(null);
    }
  };

  return {
    auth,
    loading,
    user: auth?.user || null,
    isAuthenticated: Boolean(auth?.user),
    logout,
  };
};

export default useAuth;
