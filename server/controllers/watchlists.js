import Watchlist from "../models/Watchlist.js";
import WatchlistItem from "../models/WatchlistItem.js";

// Get all watchlists for logged-in user
export const getWatchlists = async (req, res) => {
  try {
    const watchlists = await Watchlist.find({ user: req.user._id })

    console.log(watchlists);

    res.json(watchlists);
  } catch (err) {
    console.error("getWatchlists error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new watchlist hub
export const createWatchlist = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const watchlist = await Watchlist.create({
      user: req.user._id,
      name,
    });

    res.status(201).json(watchlist);
  } catch (err) {
    console.error("createWatchlist error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all items in a watchlist
export const getWatchlistItems = async (req, res) => {
  try {
    const { watchlistId } = req.params;

    const items = await WatchlistItem.find({ watchlist: watchlistId });

    res.json(items);
  } catch (err) {
    console.error("getWatchlistItems error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new watchlist item
export const createWatchlistItem = async (req, res) => {
  try {
    console.log(req.body);
    const { watchlistId } = req.params;
    const {  name } = req.body;

    const item = await WatchlistItem.create({
      watchlist: watchlistId,
      name,
    });
    res.status(201).json(item);
  } catch (err) {
    console.error("createWatchlistItem error:", err);
    res.status(500).json({ error: err.message });
  }
};
