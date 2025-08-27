import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://quick-ai-alpha-one.vercel.app/",
];

await connectCloudinary();

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("Server is Live"));

app.use(requireAuth());
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
