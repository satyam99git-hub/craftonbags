import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import AppRoutes from "./routes/AppRoutes";

import AuthModal from "./components/auth/AuthModal";

import useModal from "./hooks/useModal";

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
    </>
  );
}

export default App;