const User = require("../models/User");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");
const fs = require("fs");

exports.register = async (req, res) => {
  try {
    const { email, password, ...otherData } = req.body;

    if (!email || !password) { // email or password fields are mssing
      return res.status(400).json({ message: 'Missing fields.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) { // dont register existing user 
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // encrypt the password

    let profilePicData = null;

    if (req.file) {
      //read the uploaded file and store it as binary data
      const imageBuffer = fs.readFileSync(req.file.path);
      profilePicData = {
        data: imageBuffer,
        contentType: req.file.mimetype,
      };

      // remove the temporary file
      fs.unlinkSync(req.file.path);
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      profilePic: profilePicData,
      ...otherData,
    });

    await newUser.save();

    const token = createToken(newUser.email);
    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        profilePic: profilePicData,
        ...otherData,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    console.log("bruh");
    res.status(500).json({ message: "bruhhh" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params._id;
    const user = await User.findById(userId); // search the db using the users ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addQuizScore = async (req, res) => {
  try {
    const { userId, quizId, score } = req.body;

    if (!userId || !quizId || score == null) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const user = await User.findById(userId); // look for user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const quizScore = { quizId, score }; // add quizId and score into quizzes array in db
    user.quizzes.push(quizScore);

    await user.save();

    res.status(200).json({ message: "Quiz score recorded successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
