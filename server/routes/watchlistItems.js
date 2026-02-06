import express from "express";
import { getWatchlistItems, addWatchlistItem } from "../controllers/watchlistItem.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:watchlistId", protect, getWatchlistItems);
router.post("/", protect, addWatchlistItem);

export default router;
