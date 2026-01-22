const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//declaring a mongoose schema for department course
const addcourseSchema = mongoose.Schema({
    courseTitle : String,
    courseCode : String,
    courseDesc : String
})

//declaring a model for student course

const studcourse = mongoose.model('course',addcourseSchema);

module.exports = studcourse;