import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true
    },

    category: {
      type: String,
      default: "price" // NOT enum yet
    },

    rule: {
      type: Object,
      required: true
    },

    status: {
      type: String,
      enum: ["active", "paused", "triggered"],
      default: "active"
    },

    meta: {
      source: String, // watchlist, news, idea, manual
      expiresAt: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
