require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes'); 
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


connectDB();
app.use(express.json()); 
app.use('/api/users', userRoutes); 
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
