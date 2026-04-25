import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";

import alerts from "./routes/alerts";
import triage from "./routes/triage";
import incidents from "./routes/incidents";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://soc-frontend-seven.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/alerts", alerts);
app.use("/triage", triage);
app.use("/incidents", incidents);

const startServer = async () => {
  try {
    console.log("Starting backend...");

    await connectDB();
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error(" Server failed to start:", error);
    process.exit(1);
  }
};

startServer();