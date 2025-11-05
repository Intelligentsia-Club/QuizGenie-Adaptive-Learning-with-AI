const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); // Make sure you have a Quiz model

// GET /api/quizzes?limit=15
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  // Fetch random quizzes from DB
  const count = await Quiz.countDocuments();
  const random = Math.max(0, Math.floor(Math.random() * (count - limit)));

  const quizzes = await Quiz.find()
    .skip(random)
    .limit(limit)
    .select('_id question options'); // only send necessary fields

  res.json(quizzes);
});

module.exports = router;
