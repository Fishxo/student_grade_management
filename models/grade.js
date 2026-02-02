const express = require('express');
const mongoose = require('mongoose');



const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
  grade: { type: String, required: true },
   semester: String,

});
gradeSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Grade', gradeSchema);
