import Question from '../models/Question.js';

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    console.log('Fetched questions from DB:', questions);
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: error.message });
  }
};
