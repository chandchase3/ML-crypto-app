import express from "express";
import { getNews, createNews } from "../controllers/news.js";

const router = express.Router();

router.get("/", getNews);       // Get all news items
router.post("/", createNews);   // Create new news item

export default router;
