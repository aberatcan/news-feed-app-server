require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");

const app = express();

/*
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");
  try {
    req.user = jwt.verify(token, "secret");
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
app.use("/api/news", authMiddleware, newsRoutes);
*/

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// Handle errors
app.use((err, req, res) => {
  res.status(500).send({ error: err.message });
});

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI);

app.listen(port, () => console.log("Server started on port " + port));
