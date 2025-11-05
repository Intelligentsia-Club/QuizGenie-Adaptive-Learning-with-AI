const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

exports.list = async (req, res) => {
  const quizzes = await Quiz.find().select('-questions');
  res.json(quizzes);
};

exports.get = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate('questions');
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  res.json(quiz);
};

exports.create = async (req, res) => {
  const quiz = await Quiz.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(quiz);
};

exports.update = async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  res.json(quiz);
};

exports.remove = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: 'Quiz deleted' });
};

exports.addQuestion = async (req, res) => {
  const { text, options, correctIndex, marks } = req.body;
  const question = await Question.create({ text, options, correctIndex, marks });
  await Quiz.findByIdAndUpdate(req.params.id, { $push: { questions: question._id } });
  res.status(201).json(question);
};
