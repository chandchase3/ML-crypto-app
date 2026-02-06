import express from "express";
import { getAlerts, createAlert, updateAlert, deleteAlert } from "../controllers/alert.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAlerts);          // List all user alerts
router.post("/", createAlert);       // Create new alert
router.patch("/:id", updateAlert);   // Update alert
router.delete("/:id", deleteAlert);  // Delete alert

export default router;
