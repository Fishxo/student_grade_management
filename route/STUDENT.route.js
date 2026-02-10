const express = require ('express');
const router = express.Router();
const regstud = require('../models/regstud');
const dept = require('../models/newdpart');

//using an edit button and getting an update page
  router.get('/:studId/edit',async(req,res)=>{
    const {studId} = req.params;
    const studs = await regstud.findById(studId);
    if (!studs) return res.send('Student not found');
     res.render('studUPDATE',{studs})
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
      const deptData = await dept.find({ deptName: student.studDept });
      console.log(studentId);
   return res.render('showBATCH',{ 
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

  //for student delete button
  router.post('/:deptId/:studId/deletee',async(req,res)=>{
    const {studId,deptId} = req.params;
    
    try{
      const { batch, section } = req.query;
      await regstud.findByIdAndDelete(studId)
      
      const deptData = await dept.findById(deptId);
      const stud = await regstud.find({ studDept: deptData.deptName })
       // example: group by batch
    const batches = [...new Set(stud.map(s => s.studBatch))];

    const students = [];
    if (batch) {
      students = await regstud.find({
        studDept: { $regex: new RegExp('^' + deptData.deptName + '$', 'i') },
        studyBatch: batch
      })}
      res.render('showBATCH',{
        stu:stud,
        batches:batches,
        selectedBatch: batch || '',
        dept:deptData});
    }catch(error){
      console.log(error)
      res.send('can not delete student')
    }
  })

module.exports = router;