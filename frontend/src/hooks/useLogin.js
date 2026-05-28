import { useState } from "react";
import toast from "react-hot-toast";

import { loginUser } from "../features/auth/authAPI";
import { saveAuth } from "../features/auth/authStorage";

const useLogin = ({
  onSuccess,
} = {}) => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.password
    ) {
      return "All fields are required";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError =
      validateForm();

    if (validationError) {
      return setError(validationError);
    }

    try {
      setLoading(true);

      const response =
        await loginUser(formData);

      saveAuth(response.data);
      toast.success("Login successful");
      onSuccess?.(response.data);

    } catch (err) {
      const message =
        err?.response?.data?.message ||
          "Login failed";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
