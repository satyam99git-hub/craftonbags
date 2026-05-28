import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";
import {
  firebaseAdminAuth,
  firebaseAdminErrorMessage,
} from "../config/firebaseAdmin.js";
import {
  sendGoogleWelcomeEmail,
} from "./email.service.js";

const serializeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  photoURL: user.photoURL,
  provider: user.provider,
  phone: user.phone,
  addresses: user.addresses,
  welcomeEmailSentAt: user.welcomeEmailSentAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const registerService = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "credentials",
  });

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: serializeUser(user),
  };
};

export const loginService = async ({ email, password }) => {
  // password is select:false on schema — must explicitly request it
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.password) {
    throw new ApiError(400, "Please continue with Google for this account");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: serializeUser(user),
  };
};

export const googleAuthService = async ({ idToken }) => {
  if (!firebaseAdminAuth) {
    if (firebaseAdminErrorMessage) {
      throw new ApiError(
        500,
        "Firebase Admin credentials are invalid. Paste the service account FIREBASE_PRIVATE_KEY exactly with \\n line breaks"
      );
    }

    throw new ApiError(
      500,
      "Firebase Admin credentials are missing. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to backend/.env"
    );
  }

  let decodedToken;

  try {
    decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);
  } catch {
    throw new ApiError(401, "Invalid Google authentication token");
  }

  const email = decodedToken.email?.toLowerCase();

  if (!email || !decodedToken.email_verified) {
    throw new ApiError(401, "Google account email is not verified");
  }

  const existingUser = await User.findOne({ email });
  let user = existingUser;
  let isNewGoogleUser = false;

  if (existingUser) {
    user = await User.findByIdAndUpdate(
      existingUser._id,
      {
        $set: {
          name: decodedToken.name || existingUser.name || email.split("@")[0],
          photoURL: decodedToken.picture || existingUser.photoURL || "",
          provider: "google",
          firebaseUid: decodedToken.uid,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    try {
      user = await User.create({
        name: decodedToken.name || email.split("@")[0],
        email,
        photoURL: decodedToken.picture || "",
        provider: "google",
        firebaseUid: decodedToken.uid,
      });
      isNewGoogleUser = true;
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }

      user = await User.findOne({ email });
      isNewGoogleUser = false;
    }
  }

  if (isNewGoogleUser) {
    sendGoogleWelcomeEmail(user)
      .then(async (result) => {
        if (!result.skipped) {
          user.welcomeEmailSentAt = new Date();
          await user.save({ validateBeforeSave: false });
        }
      })
      .catch((error) => {
        console.error("Welcome email failed:", error.message);
      });
  }

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: serializeUser(user),
  };
};
