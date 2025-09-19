import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";
import foodRouter from "./Router/food.router.js";
import userRouter from "./Router/user.router.js";
import orderRouter from "./Router/order.router.js";
import uploadRouter from "./Router/upload.router.js";

import { dbconnect } from "./config/database.config.js";
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://main-portfolio-ruddy-alpha.vercel.app", // 🔁 replace with real frontend URL
    ],
  })
);
app.use(express.json());
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));

// Handle SPA routing for the frontend
app.get("*", (req, res) => {
  const indexFilePath = path.join(publicFolder, "index.html");
  res.sendFile(indexFilePath);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Connected on PORT ${PORT}`);
});
