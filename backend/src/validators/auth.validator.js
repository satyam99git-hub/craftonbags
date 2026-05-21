import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6, max: 128 })
    .withMessage("Password must be 6–128 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];

export const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];
