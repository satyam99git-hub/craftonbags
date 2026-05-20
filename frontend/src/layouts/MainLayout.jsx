// Defines the public page layout with shared navigation, content, and footer areas.
import React from "react";

import Hometop from "../components/ribbion/Hometop";
import Navbar from "../components/common/Navbar";

const MainLayout = ({
  children,
  onOpenRegister,
}) => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Hometop />

      <Navbar
        onOpenRegister={onOpenRegister}
      />

      {children}
    </div>
  );
};

export default MainLayout;