const express = require('express');
const router = express.Router();

//getting admin first page to make signin and login admin
router.get('/',(req,res)=>{
    res.render('adminFirstpage')
})

module.exports = router;