import React from "react";
import { Mail, User } from "lucide-react";

import InputField from "../common/InputField";
import PasswordField from "../common/PasswordField";

import useRegister from "../../hooks/useRegister";

const RegisterForm = ({
  onSwitchToLogin,
}) => {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useRegister();

  return (
    <div className="mx-auto w-full max-w-lg">
      
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Create Account
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Join CRAFTON and explore premium handcrafted collections.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3.5"
      >
        
        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Name */}
        <InputField
          label="Full Name"
          icon={User}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />

        {/* Email */}
        <InputField
          label="Email Address"
          type="email"
          icon={Mail}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />

        {/* Password Row */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          
          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 text-sm text-zinc-600">
          
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-black"
          />

          <span className="leading-relaxed">
            I agree to the{" "}
            <button
              type="button"
              className="font-medium text-black hover:underline"
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-medium text-black hover:underline"
            >
              Privacy Policy
            </button>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 disabled:opacity-70"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-200" />

        <span className="text-xs text-zinc-400">
          OR
        </span>

        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-300 py-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />

        Continue with Google
      </button>

      {/* Footer */}
      <div className="mt-5 text-center text-sm text-zinc-600">
        Already have an account?{" "}

        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-black hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;