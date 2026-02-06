import UserNews from "../models/UserNews.js";

export const getUserNewsProfile = async (req, res) => {
  try {
    const profile = await UserNews.findOne({ user: req.user.id }).populate("preferredAssets");
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const upsertUserNewsProfile = async (req, res) => {
  try {
    const profile = await UserNews.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};