/* ===========================
models/WatchlistItem.js
=========================== */
import mongoose from "mongoose";

/*
  WATCHLIST ITEM:
  Joins an asset to a watchlist
*/
const watchlistItemSchema = new mongoose.Schema(
  {
    watchlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watchlist",
      required: true,
    },

    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WatchlistItem", watchlistItemSchema);
