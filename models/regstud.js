const express = require('express');
const mongoose = require('mongoose');

//schema for student registeration 
const studregSchema = mongoose.Schema({
    studFname : String,
    studSname : String,
    studEmail : {type:String, required:true, unique:true},
    studPassword : String,
    studDept  : String,
    studyBatch : String,
    course: [{
   type : mongoose.Schema.Types.ObjectId,
   ref : 'course',
    }]
})

const studreg = mongoose.model('students',studregSchema);

module.exports = studreg;