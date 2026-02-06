import express from "express";
import { getAssets, createAsset } from "../controllers/asset.js";

const router = express.Router();

router.get("/", getAssets);       // Get all assets
router.post("/", createAsset);    // Create new asset

export default router;


