import Alert from "../models/Alert.js";

// GET all alerts for a user
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user.id }).populate("asset");
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new alert
export const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create({ ...req.body, user: req.user.id });
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE an existing alert
export const updateAlert = async (req, res) => {
  try {
    const updated = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE an alert
export const deleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: "Alert deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
