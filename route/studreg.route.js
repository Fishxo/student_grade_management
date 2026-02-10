const express = require('express');
const router = express.Router();
const studreg = require('../models/regstud');
const adcor  = require('../models/addcourse');
const dept = require('../models/newdpart')
const mongoose = require('mongoose');

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
 //getting a student course page 
router.get('/:deptId/fetchcourse', async (req, res) => {
    const { deptId } = req.params;

    try {
        // Find the department data first
        const deptData = await dept.findById(deptId);
        if (!deptData) {
            return res.send('Department not found');
        }

        // Fetch courses that belong to this department
        const fetchC = await studcourse.find({ dept: deptId });
        console.log("Dept ID received:", deptId);

        // Render the page with courses specific to this department
        res.render('courseForStud', {
            fetchcours: fetchC,
            dept: deptData
        });

    } catch (error) {
        console.log(error);
        res.send('Sorry, could not fetch courses');
    }
});




 router.get('/:studId/fetchcours',async(req,res)=>{
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
 })//fetching those courses 

module.exports = router;