import mongoose from "mongoose";

const userNewsItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  newsItem: { type: mongoose.Schema.Types.ObjectId, ref: "NewsItem" },

  state: {
    dismissed: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false }
  },

  annotations: {
    notes: { type: String, default: "" },
    tags: [String],
    sentimentOverride: String
  }
});

export default mongoose.model("UserNewsItem", userNewsItemSchema);
