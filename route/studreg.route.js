const express = require('express');
const router = express.Router();
const studreg = require('../models/regstud');

//getting student registeration page 

router.get('/',(req,res)=>{
    res.render('studreg')
})

//saving students to database
router.post('/',async(req,res)=>{
    const {studFnamem,studSname,studEmail,studDept,studyBatch} = req.body;
     const studReg = new studreg(req.body);
        
     try{
        await studReg.save();
        return res.send('student registered');

     }catch(error){
        console.log(error)
        res.send('sorry could not registered')
     }
})
module.exports = router;