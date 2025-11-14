import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173", // your Vite dev URL
      "https://collection-app-fe.onrender.com", // your production FE domain
    ],
    credentials: true,
  })
);
app.use(express.json());

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
