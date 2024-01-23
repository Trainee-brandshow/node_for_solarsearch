
const mongoose = require('mongoose');

const userBasicDetailSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  father: {
    type: String,
    required: true,
  },
  mother: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

const UserBasicDetail = mongoose.model('UserBasicDetail', userBasicDetailSchema);

module.exports = UserBasicDetail;
