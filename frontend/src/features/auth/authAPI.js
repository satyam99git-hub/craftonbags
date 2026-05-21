import axiosInstance from "../../api/axios";

export const registerUser = async (
  data
) => {
  const { confirmPassword, agreeToTerms, ...payload } = data;

  const response =
    await axiosInstance.post(
      "/auth/register",
      payload
    );

  return response.data;
};

export const loginUser = async (
  data
) => {
  const response =
    await axiosInstance.post(
      "/auth/login",
      data
    );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(
    "/auth/me"
  );

  return response.data;
};

export const logoutUser = async () => {
  const response =
    await axiosInstance.post("/auth/logout");

  return response.data;
};
