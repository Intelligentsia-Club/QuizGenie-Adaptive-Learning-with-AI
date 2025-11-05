const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
