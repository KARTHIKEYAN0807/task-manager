require('dotenv').config(); // Add this line at the top

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoUri = process.env.MONGO_URI; // Use the environment variable

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const taskSchema = new mongoose.Schema({
  courseId: String,
  taskName: String,
  dueDate: String,
  details: String
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.post('/tasks', async (req, res) => {
  try {
    const { courseId, taskName, dueDate, details } = req.body;
    const newTask = new Task({ courseId, taskName, dueDate, details });
    await newTask.save();
    res.status(201).send('Task added successfully');
  } catch (error) {
    res.status(500).send('Error adding task');
  }
});

app.get('/courses/:courseId/tasks', async (req, res) => {
  try {
    const { courseId } = req.params;
    const tasks = await Task.find({ courseId });
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error retrieving tasks');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
