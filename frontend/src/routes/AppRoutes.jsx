import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Collection from "../pages/Collection";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Wishlist from "../pages/Wishlist";
import AboutUs from "../pages/AboutUs";
import Shop from "../pages/Shop";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Home />}
      />
      <Route
        path="/shop"
        element={<Shop />}
      />

      <Route
        path="/collection"
        element={<Collection />}
      />

      <Route
        path="/aboutus"
        element={<AboutUs />}
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={<Wishlist />}
      />
    </Routes>
  );
};

export default AppRoutes;
