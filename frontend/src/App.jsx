import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import AppRoutes from "./routes/AppRoutes";

import AuthModal from "./components/auth/AuthModal";

import useModal from "./hooks/useModal";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  const {
    isOpen,
    openModal,
    closeModal,
  } = useModal();

  // Auth Modal Control
  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register"
    ) {
      openModal();
    } else {
      closeModal();
    }
  }, [location.pathname]);

  return (
    <>
      <MainLayout onOpenRegister={openModal}>
        <AppRoutes />
      </MainLayout>

      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          className:
            "text-sm font-medium",
        }}
      />
    </>
  );
}

export default App;
