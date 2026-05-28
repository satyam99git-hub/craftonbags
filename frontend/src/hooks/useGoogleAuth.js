import { useState } from "react";
import {
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";

import {
  getFirebaseAuth,
  getGoogleProvider,
  isFirebaseConfigured,
  missingFirebaseConfigKeys,
} from "../config/firebase";
import {
  loginWithGoogle,
} from "../features/auth/authAPI";
import {
  saveAuth,
} from "../features/auth/authStorage";

const getGoogleErrorMessage = (error) => {
  const firebaseErrorMessages = {
    "auth/account-exists-with-different-credential":
      "This email is already linked to another sign-in method",
    "auth/api-key-not-valid":
      "Firebase API key is invalid. Check frontend/.env",
    "auth/invalid-api-key":
      "Firebase API key is invalid. Check frontend/.env",
    "auth/configuration-not-found":
      "Firebase Authentication is not configured for this project. Enable Authentication and Google sign-in in Firebase Console",
    "auth/operation-not-allowed":
      "Google sign-in is not enabled in Firebase Authentication",
    "auth/unauthorized-domain":
      "This domain is not authorized in Firebase Authentication settings",
    "auth/network-request-failed":
      "Network error while connecting to Google",
  };

  if (
    error?.code === "auth/popup-closed-by-user" ||
    error?.code === "auth/cancelled-popup-request"
  ) {
    return "Google sign-in was cancelled";
  }

  if (error?.code === "auth/popup-blocked") {
    return "Please allow popups to continue with Google";
  }

  if (firebaseErrorMessages[error?.code]) {
    return firebaseErrorMessages[error.code];
  }

  return (
    error?.response?.data?.message ||
    error?.message ||
    "Google sign-in failed. Please try again"
  );
};

const useGoogleAuth = ({
  onSuccess,
} = {}) => {
  const [loading, setLoading] = useState(false);

  const continueWithGoogle = async () => {
    if (loading) return;

    if (!isFirebaseConfigured) {
      const message = `Missing Firebase config: ${missingFirebaseConfigKeys.join(", ")}`;

      toast.error(message);
      return {
        error: message,
      };
    }

    try {
      setLoading(true);

      const firebaseAuth = getFirebaseAuth();
      const googleProvider = getGoogleProvider();

      const credential =
        await signInWithPopup(
          firebaseAuth,
          googleProvider
        );

      const idToken =
        await credential.user.getIdToken(true);

      const response =
        await loginWithGoogle(idToken);

      saveAuth(response.data);
      toast.success("Signed in with Google");
      onSuccess?.(response.data);
    } catch (error) {
      const message =
        getGoogleErrorMessage(error);

      if (
        error?.code !==
        "auth/popup-closed-by-user"
      ) {
        toast.error(message);
      }

      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    googleLoading: loading,
    continueWithGoogle,
  };
};

export default useGoogleAuth;
