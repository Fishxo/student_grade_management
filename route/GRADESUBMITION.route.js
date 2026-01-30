const express = require('express');
const router = express.Router();
const dept = require('../models/newdpart')
const stud = require('../models/regstud');
const cor = require('../models/addcourse');
const grade = require('../models/grade');


//getting a grade submition page 
router.get('/:deptId/:studId',async(req,res)=>{
    const {deptId,studId} = req.params;
    const deptData = await dept.findById(deptId);
    const course = await cor.find({dept:deptId});
    const studd = await stud.findById(studId)
    res.render('GRADESUBMITION',{dept:deptData,stud:studd,course})
})

//recived a value from grade submition page and saving to database 
router.post('/:deptId/:studId',async(req,res)=>{

    const {deptId,studId,courseId} = req.params;
    const deptData = await dept.findById(deptId);
    const stude = await stud.findById(studId);
    const course = await course.findById(courseId);
    const grade = req.body;

    await grade.save();
    res.send('student grade is registerd')
}) 
module.exports = router;