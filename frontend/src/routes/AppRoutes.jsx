import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Collection from "../pages/Collection";
import Profile from "../pages/Profile";
import Wishlist from "../pages/Wishlist";
import AboutUs from "../pages/AboutUs";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";

import ProtectedRoute from "../components/auth/ProtectedRoute";

/* ADMIN */
import AdminRoutes from "../admin/routes/AdminRoutes";

const AppRoutes = ({ location }) => {
  return (
    <Routes location={location}>

      {/* USER ROUTES */}
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
        path="/products"
        element={<Shop />}
      />

      <Route
        path="/product/:slug"
        element={<ProductDetails />}
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

      {/* ADMIN ROUTES */}
      <Route
        path="/admin/*"
        element={<AdminRoutes />}
      />

    </Routes>
  );
};

export default AppRoutes;