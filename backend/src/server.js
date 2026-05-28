import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";

const REQUIRED_ENV = ["MONGO_URI", "JWT_SECRET", "JWT_EXPIRE"];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Crafton bag API running on http://localhost:${PORT}`);
});
