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
import ProductDetails from "../pages/ProductDetails";
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
      <Route path="/shop" element={<Shop />} />
      <Route
        path="/collection"
        element={<Collection />}
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
      <Route
  path="/product"
  element={<ProductDetails />}
/>
    </Routes>
  );
};

export default AppRoutes;
