import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";

const AdminRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="add-product"
          element={<AddProduct />}
        />

      </Route>

    </Routes>
  );
};

export default AdminRoutes;