const express = require('express');
const router = express.Router();
const studreg = require('../models/regstud');
const adcor  = require('../models/addcourse');
const dept = require('../models/newdpart')
const mongoose = require('mongoose');
const Grade = require('../models/grade');
//getting student registeration page 

router.get('/',(req,res)=>{
    res.render('studreg')
})

//saving students to database
router.post('/',async(req,res)=>{
    const {studFname,studSname,studEmail,studPassword,studDept,studyBatch} = req.body;
     const stud = new studreg({
      studFname ,
      studSname ,
      studEmail ,
      studPassword,
      studDept ,
      studyBatch 
     });
        
     try{
      const exist = await studreg.findOne({studEmail})
        if(exist){
          return res.send('email already exist')
        }
        await stud.save();
        return res.send('student registered');

     }catch(error){
        console.log(error)
        res.send('sorry could not registered')
     }
})
//changing the password from change the password button
 router.post('/:studId/update',async(req,res)=>{
   const {studId} = req.params;
   //console.log('email recived',studEmail)
   const pass = await studreg.findById(studId);
   if(!pass){
      res.send('password did not catched')
   }     
        res.render('PASSWORDupdate',{pass})
   
 })
 //reciving from password update page updated password and save it 
 router.post('/:studId/saved',async(req,res)=>{
   const {studId} = req.params;
    const {studPassword} = req.body;
    const up = await studreg.findById(studId)
    if(!up){
      res.send('does not found th password')
    }
       up.studPassword = studPassword;
        try{
         await up.save();
         return res.send('password changed succesfully')
        }catch(err){
         console.log(err)
         res.send('sorry could not changed it')
        }
 })
 
//fetching those courses 
 router.get('/:studId/fetchcourse',async(req,res)=>{
        const {studId} = req.params;
      try{
        
   const student = await studreg.findById(studId);

   const department = await dept.findOne({ deptName: student.studDept });

    const courses = await adcor.find({ dept: department._id });

       

       return res.render('FetchingCourseFromSTUD',{fetchcours:courses,dept:department,stud:student})
      }catch(error){
        console.log(error)
        return res.send('sorry could not make fetching')
      }
 });



//fetching taken courses from student profile
 router.get('/:studId/takenCoursss',async(req,res)=>{
        const {studId} = req.params;
        try{
          const studs = await studreg.findById(studId).populate('course')

          res.render('courseForStud',{
            stud:studs,
            fetchcours:studs.course
          });
        }catch(err){
          console.log(err)
          res.send('could not fetch')
        }
 })
 //student getting their grade from their profile 
 router.get('/:studId/grades',async(req,res)=>{
     const {deptId,studId} = req.params;
      
 
          try{
             const stude = await studreg.findById(studId);
          const deptData = await dept.findById(deptId);
         const gradee = await Grade.find({student:studId}).populate('course');
         
          res.render('GradesFromStuds',{stude,deptData,gradee})
          
          }catch(error){
             console.log(error)
             res.send('could not show up ')
          }
 })

module.exports = router;