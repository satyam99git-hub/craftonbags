// Guards frontend routes that require an authenticated user.
import React from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({
  children,
}) => {
  const location = useLocation();

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center bg-stone-50 px-5">
        <div className="text-sm font-medium text-zinc-500">
          Loading account...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
