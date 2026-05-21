import { useState } from "react";

import { registerUser } from "../features/auth/authAPI";
import { saveAuth } from "../features/auth/authStorage";

const useRegister = ({
  onSuccess,
} = {}) => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      return "All fields are required";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      return "Please accept terms";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      return setError(validationError);
    }

    try {
      setLoading(true);

      const response =
        await registerUser(formData);

      saveAuth(response.data);
      onSuccess?.(response.data);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed"
      );
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

export default useRegister;
