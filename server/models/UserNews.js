const userNewsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },

    filters: {
      sentiment: { type: String, default: "all" },
      assetScope: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
      hideDismissed: { type: Boolean, default: true }
    },

    ranking: {
      prioritizeBreaking: { type: Boolean, default: true },
      prioritizeFavorites: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);
