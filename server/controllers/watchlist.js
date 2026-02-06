import Watchlist from "../models/Watchlist.js";

export const getWatchlists = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const lists = await Watchlist.find({ user: req.user._id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createWatchlist = async (req, res) => {
  try {
    const { name, description, type } = req.body;

    const watchlist = await Watchlist.create({
      user: req.user._id,      // automatically tied to logged-in user
      name,
      description: description || "",
      type: type || "mixed",   // default type is mixed
    });

    res.status(201).json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
