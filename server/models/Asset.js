import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true
    },

    name: {
      type: String,
      required: true
    },

    market: {
      type: String,
      enum: ["crypto", "stock"],
      required: true
    },

    exchange: {
      type: String,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

assetSchema.index({ symbol: 1, type: 1 }, { unique: true });

export default mongoose.model("Asset", assetSchema);