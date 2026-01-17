const express = require('express');
const mongoose = require('mongoose');

//schema for student registeration 
const studregSchema = mongoose.Schema({
    studFname : String,
    studSname : String,
    studEmail : String,
    studDept  : String,
    studyBatch : String,
})

const studreg = mongoose.model('students',studregSchema);

module.exports = studreg;