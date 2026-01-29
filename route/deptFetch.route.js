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



  
module.exports = router;