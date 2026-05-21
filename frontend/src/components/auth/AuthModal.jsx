import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({
  isOpen,
  onClose,
}) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [mode, setMode] =
    useState("login");

  // Route based mode switching
  useEffect(() => {
    if (
      location.pathname === "/register"
    ) {
      setMode("register");
    } else if (
      location.pathname === "/login"
    ) {
      setMode("login");
    }
  }, [location.pathname]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [isOpen]);

  // ESC key close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const handleClose = () => {
    onClose();

    navigate("/");
  };

  const handleAuthSuccess = () => {
    onClose();
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      
      <div className="flex min-h-screen w-full">
        
        {/* Left Branding Section */}
        <div className="relative hidden w-[50%] overflow-hidden bg-zinc-950 text-white lg:flex lg:flex-col lg:justify-center lg:px-20">
          
          {/* Background Glow */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-6xl font-bold leading-tight tracking-tight">
              Welcome to
              <br />
              CRAFTON
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
              Premium handcrafted bags designed
              for modern lifestyle, elegance,
              and timeless fashion.
            </p>

            <div className="mt-10 flex gap-5 text-sm text-zinc-500">
              <span>
                Premium Quality
              </span>

              <span>
                Secure Checkout
              </span>

              <span>
                Fast Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Right Auth Section */}
       <div className="relative flex w-full justify-center bg-white px-8 py-10 lg:w-[50%] lg:px-20">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all hover:bg-zinc-100 hover:text-black"
          >
            ✕
          </button>

          {/* Form Wrapper */}
         <div className="w-full max-w-2xl">
            
            {mode === "login" ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={() =>
                  navigate("/register")
                }
              />
            ) : (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={() =>
                  navigate("/login")
                }
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
