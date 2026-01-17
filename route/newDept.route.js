const express = require('express');
const router = express.Router();
const dept = require('../models/newdpart');

//getting a newdept page
router.get('/',(req,res)=>{
    res.render('newdept')
})

//saving a new department to the database
router.post('/',async(req,res)=>{
    const {deptName,deptCode,deptDesc} = req.body;

    const deptt = new dept(req.body);
    try{
        await deptt.save();
        return res.send('department saved seccessfuly');
    }catch(error){
        console.log(error);
        return res.send('sorry could not create')
    }

})

module.exports = router;

