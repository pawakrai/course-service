const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    unique: true
  },
  courseDescription: {
    type: String,
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', // Reference to the Department model
    required: true
  },
  subjects: [{
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject', // Reference to the Subject model
      required: true
    },
    mandatory: {
      type: Boolean,
      default: false
    },
    credits: {
      type: Number,
      required: true
    }
  }],
  graduationRequirements: {
    minimumCredits: {
      type: Number,
      required: true
    },
    minimumGPA: {
      type: Number,
      required: true
    },
    maximumDuration: {
      type: String,
      required: true // e.g., "4 years"
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);