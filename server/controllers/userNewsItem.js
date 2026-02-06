import UserNewsItem from "../models/UserNewsItem.js";

export const getUserNewsItems = async (req, res) => {
  try {
    const items = await UserNewsItem.find({ user: req.user.id })
      .populate("newsItem");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const saveUserNewsItem = async (req, res) => {
  try {
    const item = await UserNewsItem.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
