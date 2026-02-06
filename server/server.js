import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Route imports
import assetRoutes from "./routes/assets.js";
import watchlistRoutes from "./routes/watchlists.js";
import watchlistItemRoutes from "./routes/watchlistItems.js";
import alertRoutes from "./routes/alerts.js";
import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";
import notificationRoutes from "./routes/notifications.js";
import userSettings from "./routes/userSettings.js";
import userNewsRoutes from "./routes/userNews.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/assets", assetRoutes);
app.use("/watchlists", watchlistRoutes);
app.use("/watchlist-items", watchlistItemRoutes);
app.use("/alerts", alertRoutes);
app.use("/auth", authRoutes);
app.use("/news", newsRoutes);
app.use("/notifications", notificationRoutes);
app.use("/user-settings", userSettings);
app.use("/user-news", userNewsRoutes);

//Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();