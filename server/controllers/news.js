import NewsItem from "../models/NewsItem.js";

// GET all news
export const getNews = async (req, res) => {
  try {
    const news = await NewsItem.find().populate("asset");
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a news item
export const createNews = async (req, res) => {
  try {
    const newsItem = await NewsItem.create(req.body);
    res.status(201).json(newsItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
