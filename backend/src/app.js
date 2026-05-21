import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Express v5 makes req.query a read-only getter — sanitize only body and params
app.use((req, _res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  next();
});
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
