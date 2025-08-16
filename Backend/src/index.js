import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import aiRoutes from "./routes/ai.route.js";
import { app, server } from "./lib/socket.js"; // socket.js exports app + server

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Trust proxy (important for cookies on Render/Heroku/Netlify)
app.set("trust proxy", 1);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",               // local dev
      "https://nex-chat-frontend.onrender.com", // production frontend
    ],
    credentials: true, // allow cookies + Authorization headers
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"], // 👈 ensures Set-Cookie is visible to browser
  })
);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/help", aiRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log("✅ Server is running on PORT: " + PORT);
  connectDB();
});
