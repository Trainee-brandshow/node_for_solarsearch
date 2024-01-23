
const User = require('../models/User');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { userName, email, phoneNumber, id, address } = req.body;

  try {
    const user = await User.create({ userName, email, phoneNumber, id, address });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
