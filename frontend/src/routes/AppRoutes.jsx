import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Collection from "../pages/Collection";

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
  path="/collection"
  element={<Collection />}
/>
    </Routes>
  );
};

export default AppRoutes;