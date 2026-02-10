const express = require('express');
const router = express.Router();
const studlog = require('../models/regstud');
const dept = require('../models/newdpart')

//getting a student login page by url 
router.get('/',(req,res)=>{
    res.render('studentLOGIN')
})

//getting student their account by putting their firts name and email 
router.post('/',async(req,res)=>{
  const {studEmail,studDept,studPassword} = req.body;
  const studs = await studlog.findOne({studEmail})
  
  try{
    if(!studs){
        return res.send('this email is not exist')
    }if(studs.studPassword !== studPassword){
        return res.send('sorry you use wrong password')
    }
      if (studs.studDept !== studDept) {
            return res.send('Sorry, wrong department');
        }
    
    return res.render('studFirstPage',{studs})
  }catch(error){
     console.log(error)
   return res.send('sorry could not make it')
   
  }
})
module.exports = router;