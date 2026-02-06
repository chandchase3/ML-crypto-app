import UserSettings from "../models/UserSettings.js";

export const getUserSettings = async (req, res) => {
  try {
    const settings = await UserSettings.findOne({ user: req.user.id });

    if (!settings) {
      // Default settings
      const defaultSettings = await UserSettings.create({ user: req.user.id });
      return res.json(defaultSettings);
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const settings = await UserSettings.findOne({ user: req.user.id });

    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    // Merge existing settings with updates from request 
    Object.keys(req.body).forEach((key) => {
      settings[key] = req.body[key];
    });

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
