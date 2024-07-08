const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/User");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Get articles
router.get("/search", async (req, res) => {
  const { query } = req.query;
  const newApiUrl = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;
  try {
    const newsRes = await axios.get(newApiUrl);
    res.json(newsRes.data);
  } catch (err) {
    res.status(500).send("Error fetching articles");
  }
});

// Save user preferences
router.post("/preferences", async (req, res) => {
  const { userId, sources, categories, authors } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.preferences = { sources, categories, authors };
    await user.save();

    res.status(200).send("Preferences saved");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get user preferences
router.get("/preferences/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user.preferences);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Fetch articles based on user preferences
router.get("/preferred-feed/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const { sources, categories, authors } = user.preferences;
    const sourceQuery = sources.length ? `sources=${sources.join(",")}` : "";
    const categoryQuery = categories.length
      ? `category=${categories.join(",")}`
      : "";
    const authorQuery = authors.length ? `author=${authors.join(",")}` : "";

    // newsAPI only supports query by sources, not for authors and category
    const newsApiSourceUrl = `https://newsapi.org/v2/top-headlines?${sourceQuery}&apiKey=${process.env.NEWS_API_KEY}`;
    // const newsApiUrl = `https://newsapi.org/v2/top-headlines?${sourceQuery}&${categoryQuery}&${authorQuery}&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(newsApiSourceUrl);
    res.json(response.data.articles);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
