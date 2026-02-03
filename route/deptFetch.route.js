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
    res.render('deptFetch', { dept: deptat }); // list of departments
  } catch (err) {
    console.log(err);
    res.send('cannot fetch departments');
  }
});
//getting update department page using edit button 
router.get('/:deptId/edit',async(req,res)=>{
    const {deptId} = req.params;
    try{
      const deptt = await dept.findById(deptId);
      res.render('DEPARTMENTupdate',{dept:deptt})
    }catch(error){
      console.log(error)
      res.send('sorry could not get update page')
    }
})
router.post('/:deptId/delete',async(req,res)=>{

     const {deptId} = req.params;
     try{
     await dept.findByIdAndDelete(deptId)
     const deptt = await dept.find();
     res.render('deptFetch',{dept:deptt})
      
     }catch(error){
      console.log(error)
      res.send('sorry could not delete this department')
     }
})

router.post('/:deptId/update',async(req,res)=>{
        const {deptId} = req.params;
        const {deptName,deptCode,deptDesc} = req.body;
        
        try{
           const deptat = await dept.findById(deptId)
           deptat.deptName = deptName;
           deptat.deptCode = deptCode;
           deptat.deptDesc = deptDesc;

          await dept.findByIdAndUpdate(deptId)

          await deptat.save();
          res.send('updated successfully')
        }catch(error){
          console.log(error)
          res.send('could not save your updates')
        }
})
  
module.exports = router;