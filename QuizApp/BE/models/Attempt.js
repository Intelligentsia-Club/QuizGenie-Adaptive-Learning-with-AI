const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Attempt || mongoose.model('Attempt', attemptSchema);
