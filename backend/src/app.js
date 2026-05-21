import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({
    message: "Crafton Bags API is running",
    status: "ok",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "healthy",
    service: "craftonbags-backend",
  });
});

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
