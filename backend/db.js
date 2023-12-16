const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database:", connection.connection.db.databaseName);
  } catch (err) {
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
