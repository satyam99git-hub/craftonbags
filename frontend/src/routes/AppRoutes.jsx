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
import ProductDetails from "../pages/ProductDetails";
const AppRoutes = ({ location }) => {
  return (
    <Routes location={location}>
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
    </Routes>
  );
};

export default AppRoutes;
