const express = require('express');
const router = express.Router();
const dept = require('../models/newdpart')
const addcor = require('../models/addcourse')
 //getting an addnig course for every departments
 router.get('/:deptId/createCours',async(req,res)=>{
  
    const deptId = req.params.deptId;
    const deptData = await dept.findById(deptId)
   res.render('createCours',{dept:deptData})
 })

 //recived a new courses and saving to databas
 router.post('/:deptId/createCourse', async (req, res) => {
   const deptId = req.params.deptId;
   const { courseTitle, courseCode, courseDesc } = req.body;
    const addc = new addcor({ courseTitle,
   courseCode,
   courseDesc,
   dept: deptId});
   try{
     const add =   await addc.save();
     return res.send('Course created');
   }catch(error){
     console.log(error)
     return res.send('sorry could not created your course');
   }  
 }); 
 
//fetching those courses 
 router.get('/:deptId/fetchcourse',async(req,res)=>{
        
      try{
        const deptId = req.params.deptId;
    const deptData = await dept.findById(deptId)
       const fetchC = await addcor.find({dept:deptId});
       return res.render('fetchcourse',{fetchcours:fetchC,dept:deptData})
      }catch(error){
        console.log(error)
        return res.send('sorry could not make fetching')
      }
 })

  //getting an edit button and update page for course edit
  router.get('/:deptId/:courseId/Course',async(req,res)=>{
   
    const {courseId,deptId} = req.params;
 
    const deptData = await dept.findById(deptId);
    const core = await addcor.findById(courseId);
       if(!core) return res.send('course not found');
       res.render('UPDATEcourse',{core,dept:deptData})
  })

  // recieved datas from updatecourse page and make save to database
   router.post('/:deptId/:courseId/updatee',async(req,res)=>{
     
    const {courseTitle,courseCode,courseDesc,deptId} = req.body;
    try{
      const deptId = req.params.deptId;
      const {courseId} = req.params;
      const deptData = await dept.findById(deptId)
      const core = await addcor.findById(courseId);
      if(!core) { res.send('course can not find ')}
  
      core.courseTitle = courseTitle,
      core.courseCode  = courseCode,
      core.courseDesc  = courseDesc
  
      await core.save()
      const fetchC = await addcor.find({ dept: deptId });
      return res.render('fetchcourse', { fetchcours: fetchC, dept: deptData });
  
    }catch(error){
      console.log(error)
      res.send('can not save the changes ')
    }
   })

   //getting a delete requiest and deleting courses
   router.post('/:deptId/:courseId/Delete',async(req,res)=>{
     
     const {deptId,courseId} = req.params;
      const deptData = await dept.findById(deptId);
      //const course = await addcor.findById(courseId);
      try{
             await addcor.findByIdAndDelete(courseId);
             const cour = await addcor.find({dept:deptId});
            return res.render('fetchcourse',{fetchcours:cour, dept:deptData});
            return res.send('course deleted successfully')
      }catch(error){
       console.log(error)
       res.send('can not delet this course');
      }
   })

 module.exports = router;