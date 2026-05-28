// Renders login fields and submits credentials to the authentication flow.
import React from "react";
import { Mail } from "lucide-react";

import InputField from "../common/InputField";
import PasswordField from "../common/PasswordField";
import GoogleAuthButton from "./GoogleAuthButton";

import useLogin from "../../hooks/useLogin";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const LoginForm = ({
  onSwitchToRegister,
  onSuccess,
}) => {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useLogin({
    onSuccess,
  });

  const {
    googleLoading,
    continueWithGoogle,
  } = useGoogleAuth({
    onSuccess,
  });

  return (
    <div className="w-full">
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-zinc-900">
          Welcome Back
        </h2>

        <p className="text-zinc-500 mt-2">
          Login to continue shopping
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <InputField
          label="Email Address"
          type="email"
          icon={Mail}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />

        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between text-sm">
          
          <label className="flex items-center gap-2 text-zinc-600">
            <input type="checkbox" />
            Remember me
          </label>

          <button
            type="button"
            className="text-black hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full bg-black hover:bg-zinc-800 text-white py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-200" />
        <span className="text-xs font-medium text-zinc-400">
          OR
        </span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      <GoogleAuthButton
        loading={googleLoading}
        onClick={continueWithGoogle}
      />

      <div className="mt-6 text-center text-sm text-zinc-600">
        Don't have an account?{" "}

        <button
          onClick={onSwitchToRegister}
          className="font-semibold text-black hover:underline"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
