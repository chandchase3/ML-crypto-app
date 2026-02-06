import express from "express";
import { getUserNewsItems, saveUserNewsItem } from "../controllers/userNewsItem.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserNewsItems);
router.post("/", protect, saveUserNewsItem);

export default router;
