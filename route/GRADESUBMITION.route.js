const express = require('express');
const router = express.Router();
const dept = require('../models/newdpart')
const stud = require('../models/regstud');
const cor = require('../models/addcourse');
const Grade = require('../models/grade');


//getting a grade submition page 
router.get('/:deptId/:studId',async(req,res)=>{
    const {deptId,studId} = req.params;
    const deptData = await dept.findById(deptId);
   // const course = await cor.find({dept:deptId});
    const studd = await stud.findById(studId).populate('course');
    res.render('GRADESUBMITION',{dept:deptData,stud:studd,course:studd.course})
})

//recived a value from grade submition page and saving to database 
router.post('/:deptId/:studId',async(req,res)=>{

    const {deptId,studId} = req.params;

    const {grade,courseId} = req.body;
try{
    const newGrade = new Grade({
        student : studId,
        dept    : deptId,
        course : courseId,
        grade  
    });
    await newGrade.save();
    res.send('grade is submitted');
}catch(err){
    if(err.code == 11000){
        res.send('this course already has grade')
    }else{
        console.log(err)
        res.send('somthing is wrong')
    }
}
    }) 
router.get('/:deptId/:studId/grades',async(req,res)=>{
      const {deptId,studId} = req.params;
      
         try{
            const stude = await stud.findById(studId);
         const deptData = await dept.findById(deptId);
        const gradee = await Grade.find({student:studId}).populate('course');
        
         res.render('grades',{stude,deptData,gradee})
         }catch(error){
            console.log(error)
            res.send('could not show up ')
         }
})
   

module.exports = router;