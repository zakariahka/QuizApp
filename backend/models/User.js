const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    data: Buffer, // Store binary data
    contentType: String, // Store content type (e.g., image/jpeg)
  },
  quizzes: [{
    quizId: String,
    score: Number
  }]
});

module.exports = mongoose.model('User', userSchema);
