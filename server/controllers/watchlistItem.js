import WatchlistItem from "../models/WatchlistItem.js";

export const getWatchlistItems = async (req, res) => {
  try {
    const items = await WatchlistItem.find({ watchlist: req.params.watchlistId })
      .populate("asset");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addWatchlistItem = async (req, res) => {
  try {
    const item = await WatchlistItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
