const express = require('express');
const router = express.Router();
const adminsign = require('../models/adminSign');

 router.get('/',(req,res)=>{
    res.render('adminSIGN')
 })

//saving the the admin signin to database 
 
router.post('/',async(req,res)=>{

    const {adminFirstname,adminSecond,adminEmail,adminPassword} = req.body;
      const adsign = new adminsign(req.body);
    try{
        await adsign.save();
        res.send('admin registerd success')
 }catch(error){
    console.log(error)
 }
 

})

module.exports = router;