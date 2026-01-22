const express = require('express');
const router = express.Router();
const dept = require('../models/newdpart');
const regstud = require('../models/regstud');
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

router.get('/:deptId', async (req, res) => {
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
 //getting an addnig course for every departments
 router.get('/:deptId/createCourse',(req,res)=>{
  const deptId = req.params.deptId;
  const deptData =  dept.findById(deptId)
   res.render('createCourse')
 })



module.exports = router;