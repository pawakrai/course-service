require('dotenv').config({ path: './config.env' });

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Database'))
  .catch((error) => console.error(error));

// Routes
const coursesRouter = require('./routes/courses');
const departmentsRouter = require('./routes/departments');
const subjectsRouter = require('./routes/subjects');

app.use('/api/courses', coursesRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/subjects', subjectsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));