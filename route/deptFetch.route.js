const express = require('express');
const router = express.Router();
const dept = require('../models/newdpart');
const regstud = require('../models/regstud');
const addcor = require('../models/addcourse');
const studreg = require('../models/regstud');

// deptFetch.route.js
router.get('/', async (req, res) => {
  try {
    const deptat = await dept.find();
    res.render('deptFetch', { stud: deptat }); // list of departments
  } catch (err) {
    console.log(err);
    res.send('cannot fetch departments');
  }
});
//getting a specfic department using url and fetching those renderd infos 
router.get('/:deptId/', async (req, res) => {
  try {
    const { deptId } = req.params;
    const { batch, section } = req.query;

    const deptData = await dept.findById(deptId);
    if (!deptData) return res.send('Department not found');

    const batches = await regstud.distinct('studyBatch', {
      studDept: deptData.deptName
    });

    let students = [];

    if (batch) {
      students = await regstud.find({
        studDept: { $regex: new RegExp('^' + deptData.deptName + '$', 'i') },
        studyBatch: batch
      });
    }

    res.render('batchSectionPage', {
      dept: deptData,
      batches,
      selectedBatch: batch || '',
      selectedSection: section || '',
      stu: students
    });
  } catch (err) {
    console.log(err);
    res.send('error loading department students');
  }
});

 // making batch button have value
 router.get('/:deptId/batches', async (req, res) => {
  try {
    const { deptId } = req.params;
    const { batch, section } = req.query;

    const deptData = await dept.findById(deptId);
    if (!deptData) return res.send('Department not found');

    const batches = await regstud.distinct('studyBatch', {
      studDept: deptData.deptName
    });

    let students = [];

    if (batch) {
      students = await regstud.find({
        studDept: { $regex: new RegExp('^' + deptData.deptName + '$', 'i') },
        studyBatch: batch
      });
    }

    res.render('showBATCH', {
      dept: deptData,
      batches,
      selectedBatch: batch || '',
      selectedSection: section || '',
      stu: students
    });
  } catch (err) {
    console.log(err);
    res.send('error loading department students');
  }
});




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

  //using an edit button and getting an update page
  router.get('/:studId/edit',async(req,res)=>{
    const {studId} = req.params;
    const studs = await regstud.findById(studId);
    if (!studs) return res.send('Student not found');
     res.render('studUPDATE',{studs})
  })

 //getting an edit button and update page for course edit
 router.get('/:courseId/Course',async(req,res)=>{
  
   const {courseId,deptId} = req.params;

   const deptData = await dept.findById(deptId);
   const core = await addcor.findById(courseId);
      if(!core) return res.send('course not found');
      res.render('UPDATEcourse',{core,dept:deptData})
 })
// recieved datas from updatecourse page and make save to database
 router.post('/:courseId/updatee',async(req,res)=>{
   
  const {courseTitle,courseCode,courseDesc,deptId} = req.body;
  try{
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

  //getting from update button and save to database
  router.post('/:studentId/update',async(req,res)=>{
   const {studentId} = req.params;
   const {studFname,studSname,studEmail,studyBatch} = req.body;

   try{
    

    const student = await regstud.findById(studentId);
    if(!student)return res.send('can not find student');

    
      student.studFname = studFname;
      student.studSname = studSname;
      student.studEmail = studEmail;
      student.studyBatch = studyBatch;

      await student.save();
      const deptData = await dept.findOne({ deptName: student.studDept });
      console.log(studentId);
   return res.render('batchSectionPage',{ 
      stu: [student], 
      dept: deptData,
     batches: [], 
    selectedBatch: student.studyBatch,
     selectedSection: ''
    
    })
    
   }catch(error){
    console.log(error);
    return res.send('sorry could not updat');
    
   }

  })
  
module.exports = router;