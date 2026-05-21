import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../features/auth/authAPI";
import { saveAuth } from "../features/auth/authStorage";


const useLogin = ({
  onSuccess,
} = {}) => {
  const [loading, setLoading] =
    useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "All fields are required";
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      return "Please enter a valid email address";
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
        await loginUser(formData);

      saveAuth(response.data);
      onSuccess?.(response.data);


      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};

export default useLogin;
