import express from "express";
import { getUserNews, addUserNewsItem } from "../controllers/userNewsItem.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserNews);
router.post("/", protect, addUserNewsItem);

export default router;
