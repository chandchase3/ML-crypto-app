/* ===========================
models/UserSettings.js
=========================== */
import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    mode: {
      type: String,
      enum: ["stocks", "crypto", "mixed"],
      default: "stocks",
    },

    tradingStyle: {
      type: String,
      enum: ["day", "swing", "long"],
      default: "day",
    },

    newsPreferences: {
      sentiment: {
        type: String,
        enum: ["bullish", "bearish", "neutral", "all"],
        default: "all",
      },

      autoDismissAfterHours: {
        type: Boolean,
        default: false,
      },
    },

    alertDefaults: {
      enabled: {
        type: Boolean,
        default: true,
      },

      expireSameDay: {
        type: Boolean,
        default: true,
      },
    },

    ui: {
      theme: {
        type: String,
        default: "default",
      },

      highlightStrategyItems: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserSettings", userSettingsSchema);
