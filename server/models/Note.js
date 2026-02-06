/* ===========================
models/Note.js
=========================== */
import mongoose from "mongoose";

/*
  NOTE:
  User-created annotation attached to any entity
  (asset, watchlist, watchlist item, news, idea, etc.)
*/
const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    content: {
      type: String,
      required: true,
      trim: true
    },

    // Polymorphic reference
    targetType: {
      type: String,
      required: true,
      enum: [
        "Asset",
        "Watchlist",
        "WatchlistItem",
        "NewsItem",
        "Idea"
      ]
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    tags: [
      {
        type: String,
        trim: true
      }
    ],

    pinned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Helpful index for fast lookups
noteSchema.index({ user: 1, targetType: 1, targetId: 1 });

export default mongoose.model("Note", noteSchema);
