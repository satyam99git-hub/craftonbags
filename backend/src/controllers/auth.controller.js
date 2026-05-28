import asyncHandler from "../utils/asyncHandler.js";
import {
  googleAuthService,
  registerService,
  loginService,
} from "../services/auth.service.js";
import {
  getAuthCookieOptions,
  getClearAuthCookieOptions,
} from "../utils/authCookie.js";
import generateToken from "../utils/generateToken.js";

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

export const googleAuth = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  const data = await googleAuthService({ idToken });

  res.cookie("token", data.token, getAuthCookieOptions());

  res.status(200).json({
    success: true,
    message: "Google login successful",
    data: {
      user: data.user,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", getClearAuthCookieOptions());

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const refreshSession = asyncHandler(async (req, res) => {
  const token = generateToken(req.user._id, req.user.role);

  res.cookie("token", token, getAuthCookieOptions());

  res.status(200).json({
    success: true,
    message: "Session refreshed",
    data: {
      user: req.user,
    },
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
        photoURL: user.photoURL,
        provider: user.provider,
        phone: user.phone,
        addresses: user.addresses,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
  });
});

export const protectedExample = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "You can access this protected route",
    data: {
      userId: req.user._id,
      role: req.user.role,
    },
  });
});
