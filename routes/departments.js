const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// Getting all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one department
router.get('/:id', getDepartment, (req, res) => {
  res.json(res.department);
});

// Creating one department
router.post('/', async (req, res) => {
  const department = new Department({
    departmentName: req.body.departmentName,
    departmentDescription: req.body.departmentDescription,
  });
  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one department
router.patch('/:id', getDepartment, async (req, res) => {
  if (req.body.departmentName != null) {
    res.department.departmentName = req.body.departmentName;
  }
  if (req.body.departmentDescription != null) {
    res.department.departmentDescription = req.body.departmentDescription;
  }
  try {
    const updatedDepartment = await res.department.save();
    res.json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one department
router.delete('/:id', getDepartment, async (req, res) => {
  try {
    await res.department.remove();
    res.json({ message: 'Deleted Department' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getDepartment(req, res, next) {
  let department;
  try {
    department = await Department.findById(req.params.id);
    if (department == null) {
      return res.status(404).json({ message: 'Cannot find department' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.department = department;
  next();
}

module.exports = router;