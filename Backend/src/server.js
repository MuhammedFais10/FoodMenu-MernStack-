import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";
import foodRouter from "./Router/food.router.js";
import userRouter from "./Router/user.router.js";
import orderRouter from "./Router/order.router.js";
import uploadRouter from "./Router/upload.router.js";
import paymentRouter from "./Router/razorepay.router.js";

import { dbconnect } from "./config/database.config.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();
await dbconnect();
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://main-portfolio-ruddy-alpha.vercel.app",
      "https://frontendfoodmine.vercel.app",
    ],
  }),
);
app.use(express.json());
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/payment", paymentRouter);

// const publicFolder = path.join(__dirname, "public");
// app.use(express.static(publicFolder));

app.get("/", (req, res) => {
  res.send("hello");
});

// Handle SPA routing for the frontend
// app.get("*", (req, res) => {
//   const indexFilePath = path.join(publicFolder, "index.html");
//   res.sendFile(indexFilePath);
// });

const PORT = process.env.PORT || 5000;

// Only listen locally, NOT on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
export default app;
