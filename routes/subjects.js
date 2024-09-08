const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// Getting all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one subject by subjectId
router.get('/:subjectId', getSubject, (req, res) => {
  res.json(res.subject);
});

// Creating one subject
router.post('/', async (req, res) => {
  const subject = new Subject({
    subjectId: req.body.subjectId, // Use subjectId from the request body
    subjectName: req.body.subjectName,
    subjectDescription: req.body.subjectDescription,
    credits: req.body.credits,
  });
  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one subject by subjectId
router.patch('/:subjectId', getSubject, async (req, res) => {
  if (req.body.subjectName != null) {
    res.subject.subjectName = req.body.subjectName;
  }
  if (req.body.subjectDescription != null) {
    res.subject.subjectDescription = req.body.subjectDescription;
  }
  if (req.body.credits != null) {
    res.subject.credits = req.body.credits;
  }
  try {
    const updatedSubject = await res.subject.save();
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one subject by subjectId
router.delete('/:subjectId', getSubject, async (req, res) => {
  try {
    await res.subject.remove();
    res.json({ message: 'Deleted Subject' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a subject by subjectId
async function getSubject(req, res, next) {
  let subject;
  try {
    subject = await Subject.findOne({ subjectId: req.params.subjectId }); // Find by subjectId
    if (subject == null) {
      return res.status(404).json({ message: 'Cannot find subject' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subject = subject;
  next();
}

module.exports = router;