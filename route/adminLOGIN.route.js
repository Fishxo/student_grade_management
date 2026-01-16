const express = require('express');
const router = express.Router();
const adsign = require('../models/adminSign');

//getting a login page 
router.get('/',(req,res)=>{
    res.render('adminLOG')
})

router.post('/',async(req,res)=>{
    const {adminEmail,admiPassword} = req.body;

    const adsig = await adsign.findOne({adminEmail});
    try{
        if(!adsig){
            return res.send('user does not exist');
        }if(admiPassword !== adsig.admiPassword){
           return res.send('password did not much')
        }
        return res.render('adminHomepage')
    }catch(error){
        res.send('sorry could not make it')
        console.log(error)
    }
     
})

module.exports = router;