const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Getting all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('departmentId').populate('subjects.subjectId');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one course
router.get('/:id', getCourse, (req, res) => {
  res.json(res.course);
});

// Creating one course
router.post('/', async (req, res) => {
  const course = new Course({
    courseName: req.body.courseName,
    courseDescription: req.body.courseDescription,
    departmentId: req.body.departmentId,
    subjects: req.body.subjects,
    graduationRequirements: req.body.graduationRequirements,
  });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one course
router.patch('/:id', getCourse, async (req, res) => {
  if (req.body.courseName != null) {
    res.course.courseName = req.body.courseName;
  }
  if (req.body.courseDescription != null) {
    res.course.courseDescription = req.body.courseDescription;
  }
  if (req.body.departmentId != null) {
    res.course.departmentId = req.body.departmentId;
  }
  if (req.body.subjects != null) {
    res.course.subjects = req.body.subjects;
  }
  if (req.body.graduationRequirements != null) {
    res.course.graduationRequirements = req.body.graduationRequirements;
  }
  try {
    const updatedCourse = await res.course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one course
router.delete('/:id', getCourse, async (req, res) => {
  try {
    await res.course.remove();
    res.json({ message: 'Deleted Course' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCourse(req, res, next) {
  let course;
  try {
    course = await Course.findById(req.params.id).populate('departmentId').populate('subjects.subjectId');
    if (course == null) {
      return res.status(404).json({ message: 'Cannot find course' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.course = course;
  next();
}

module.exports = router;