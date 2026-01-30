const express = require('express');
const mongoose = require('mongoose');



const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'AddCourse', required: true },
  grade: { type: String, required: true },
  semester: String
});

module.exports = mongoose.model('Grade', gradeSchema);
