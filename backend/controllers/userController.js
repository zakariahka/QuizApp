const User = require('../models/User');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');
const saveImageToFileSystem = require('../utils/saveImageToFileSystem'); 

exports.register = async (req, res) => {
  try {
    const { email, password, base64Image, ...otherData } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    let imageUrl = "";
    if (base64Image) {
      imageUrl = await saveImageToFileSystem(base64Image); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      imageUrl,
      ...otherData,
    });

    await newUser.save();

    const token = createToken(email);
    res.status(201).json({ token, user: { email: newUser.email, imageUrl: newUser.imageUrl, ...otherData } });
    console.log('yo')
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('nah')
  }
};



exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.addQuizScore = async (req, res) => {
  try {
    const { userId, quizId, score } = req.body;

    await User.findByIdAndUpdate(userId, {
      $push: { quizzes: { quizId, score } }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
