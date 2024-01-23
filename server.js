
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const userBasicDetailController = require('./controllers/userBasicDetailController');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://elasticData:Qc5ShsoricwxWeED@cluster0.fxbfz0e.mongodb.net/elasticData?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to know when we're connected)
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

// User Routes
app.get('/users', userController.getUsers);
app.post('/users', userController.createUser);

// User Basic Detail Routes
app.get('/user-basic-details', userBasicDetailController.getUserBasicDetails);
app.post('/user-basic-details', userBasicDetailController.createUserBasicDetail);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
