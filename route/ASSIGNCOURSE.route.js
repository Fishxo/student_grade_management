const express = require('express');
const router = express.Router();
const cor = require('../models/addcourse');
const regstud = require('../models/regstud');
const dept = require('../models/newdpart');

//getting the assigncourse page passing those datas
router.get('/:deptId/:studId',async(req,res)=>{
    const {studId,deptId} = req.params;
    const course = await cor.find({dept:deptId});
    const deptt = await dept.findById(deptId);
    const student = await regstud.findById(studId)
    res.render('ASSIGNCOURSE',{student,deptt,course})
})

//recived those assigned courses and saving to database 
router.post('/:deptId/:studId',async(req,res)=>{

     const {studId} = req.params;
     const {courseId} = req.body;
      try{
        
     const student = await regstud.findById(studId);

       if (student.course.includes(courseId)) {
    return res.send('This course is already assigned to the student.');
  }
  
     student.course.push(courseId);

    await student.save();
    res.send('assigned')
      }catch(err){
         if(err == 11000){
          console.log(err)
          res.send('this course assigned already')
         }
      }
})

//getting stuents courses pages 
router.get('/:deptId/:studId/course', async (req, res) => {
  const {deptId,studId} = req.params;
  const deptData = await dept.findById(deptId);

  const student = await regstud
    .findById(req.params.studId)
    .populate('course');

  res.render('studentCourses', { student,dept:deptData,stud:student });
});

module.exports = router;