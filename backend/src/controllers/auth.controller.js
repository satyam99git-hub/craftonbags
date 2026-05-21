import asyncHandler from "../utils/asyncHandler.js";
import { registerService, loginService } from "../services/auth.service.js";

const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const data = await registerService({ name, email, password });

  res.cookie("token", data.token, getAuthCookieOptions());

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      user: data.user,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const data = await loginService({ email, password });

  res.cookie("token", data.token, getAuthCookieOptions());

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: data.user,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});
