const express = require('express');
const mongoose = require('mongoose');
// declaring schema 

const adminsignSchema = mongoose.Schema({
    adminFirstname:String,
    adminSecondname:String,
    adminEmail:String,
    adminPassword:String
})

const adminsign = mongoose.model('adminsign',adminsignSchema);
module.exports = adminsign;