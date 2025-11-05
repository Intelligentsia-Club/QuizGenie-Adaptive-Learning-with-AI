import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

// Explicitly set collection name to match Atlas
export default mongoose.model('Question', questionSchema, 'questions');
