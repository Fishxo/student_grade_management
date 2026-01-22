const express = require('express');
const router = express.Router();
const studlog = require('../models/regstud');

//getting a student login page by url 
router.get('/',(req,res)=>{
    res.render('studentLOGIN')
})

//getting student their account by putting their firts name and email 
router.post('/',async(req,res)=>{
  const {studFname,studEmail} = req.body;
  const studs = await studlog.findOne({studEmail})
  try{
    if(!studs){
        return res.send('this email is not exist')
    }if(studs.studFname !== studFname){
        return res.send('sorry your first name does not match')
    }
    return res.render('studFirstPage')
  }catch(error){
   return res.send('sorry could not make it')
    console.log(error)
  }
})
module.exports = router;