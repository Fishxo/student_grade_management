const express = require('express');
const mongoose = require('mongoose');

//declaring a schema for a department 
const deptSchema = mongoose.Schema({
    deptName : String,
    deptCode : String,
    deptDesc : String,
})

const dept = mongoose.model('department',deptSchema);

module.exports = dept;