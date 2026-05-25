import React from "react";

import Hometop from "../components/ribbion/Hometop";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({
  children,
  onOpenRegister,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">

      {/* Top Ribbon */}
      <Hometop />

      {/* Navbar */}
      <Navbar
        onOpenRegister={onOpenRegister}
      />

      {/* Main Content */}
      <main className="flex-grow overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;