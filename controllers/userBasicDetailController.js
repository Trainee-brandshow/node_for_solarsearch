
const UserBasicDetail = require('../models/UserBasicDetail');

// Get all user basic details
exports.getUserBasicDetails = async (req, res) => {
  try {
    const userBasicDetails = await UserBasicDetail.find();
    res.json(userBasicDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.createUserBasicDetail = async (req, res) => {
  const { id, userName, father, mother, dob } = req.body;

  // Simple validation
  if (!id || !userName || !father || !mother || !dob) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userBasicDetail = await UserBasicDetail.create({ id, userName, father, mother, dob });
    res.status(201).json(userBasicDetail);
  } catch (error) {
    console.error('Error creating user basic detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

