import express from "express";
import { getWatchlists, createWatchlist } from "../controllers/watchlist.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getWatchlists);

router.post("/", createWatchlist);

export default router;
