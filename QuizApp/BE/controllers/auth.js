const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password, role });
  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};
