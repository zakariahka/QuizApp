require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes'); 
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

connectDB();

// Use the cors middleware before defining routes
app.use(cors());

app.use(express.json()); 
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
