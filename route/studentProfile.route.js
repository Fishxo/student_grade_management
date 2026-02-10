const express = require('express');
const router = express.Router();
const dept = require('../models/newdpart');
const regstud = require('../models/regstud');
const course = require('../models/addcourse');
const Grade = require('../models/grade');
router.get('/:deptId/:studId/',async(req,res)=>{
    const {deptId,studId} = req.params;
   // const {batch} = req.body ;
     
     try{
      const deptt =  await dept.findById(deptId);
      const studd =  await regstud.findById(studId).populate('course');
      const gradee = await Grade.find({student:studId}).populate('course');

        res.render('studProfile',{depta:deptt,stud:studd,gradee})
     }catch(err){
        console.log(err)
        res.send('could not get student profile page')
     }

})

//getting student grades page in student profile page 
router.get('/:deptId/:studId/grades',async(req,res)=>{
    const {deptId,studId} = req.params;
     

         try{
            const stude = await regstud.findById(studId);
         const deptData = await dept.findById(deptId);
        const gradee = await Grade.find({student:studId}).populate('course');
        
         res.render('grades',{stude,deptData,gradee})
         
         }catch(error){
            console.log(error)
            res.send('could not show up ')
         }
})

//getting student course page from taken course button 
router.get('/:deptId/:studId/course',async(req,res)=>{
   const {deptId,studId} = req.params;
    try{
      const deptt = await dept.findById(deptId);
      const stud = await regstud.findById(studId).populate('course');
      

        res.render('test',{dept:deptt,stude:stud});
    }catch(err){
      console.log(err)
      res.send('could not get studentCourse page')
    }
})
// getting a student course credit page using button
router.get('/:deptId/:studId/credit',async(req,res)=>{
   
   const {deptId,studId} = req.params;
   try{
      const deptt = await dept.findById(deptId);
      const stud = await regstud.findById(studId).populate('course')

      res.render('COURSEcredit',{deptt,stud})
   }catch(err){
      console.log(err)
      res.send('could not get courses credit page')
   }

})

module.exports = router;