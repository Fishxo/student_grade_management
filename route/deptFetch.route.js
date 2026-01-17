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

router.get('/:id', async (req, res) => {
  try {
     const deptData = await dept.findById(req.params.id);
    if (!deptData) return res.send('Department not found');
    
   const students = await regstud.find({
  studDept: { $regex: new RegExp('^' + deptData.deptName + '$', 'i') }
});
     res.render('batchSectionPage', { dept: deptData, stu: students });

  } catch (err) {
    console.log(err);
    res.send('cannot fetch department details');
  }
});

module.exports = router;