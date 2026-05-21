import React from "react";

import Hometop from "../components/ribbion/Hometop";
import Navbar from "../components/common/Navbar";

const MainLayout = ({
  children,
  onOpenRegister,
}) => {
  return (
    <div className="min-h-screen bg-stone-50">
      
      {/* Top Ribbon */}
      <Hometop />

      {/* Sticky Navbar */}
      <Navbar
        onOpenRegister={onOpenRegister}
      />

      {/* Main Content */}
      <main className="overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;