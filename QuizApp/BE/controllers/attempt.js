const Attempt = require('../models/Attempt');
const Quiz = require('../models/Quiz');

exports.createAttempt = async (req, res) => {
  const { quizId, answers } = req.body;
  const quiz = await Quiz.findById(quizId).populate('questions');
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

  let score = 0;
  let maxScore = 0;

  quiz.questions.forEach((q) => {
    maxScore += q.marks;
    const answer = answers.find(a => String(a.question) === String(q._id));
    if (answer && answer.selectedIndex === q.correctIndex) score += q.marks;
  });

  const attempt = await Attempt.create({
    quiz: quiz._id,
    user: req.user._id,
    answers,
    score,
    maxScore,
    finishedAt: new Date()
  });

  res.status(201).json(attempt);
};

exports.myAttempts = async (req, res) => {
  const attempts = await Attempt.find({ user: req.user._id }).populate('quiz');
  res.json(attempts);
};
