const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');

//middleware handler 
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')

//declaring routes file 
const adminFirstpageRoutes = require('./route/adminF.route');
const adminSIGNRoutes = require('./route/adminSIGN.route');
const adminLOGINRoutes = require('./route/adminLOGIN.route');

//using routes file
app.use('/adminfirst',adminFirstpageRoutes);
app.use('/adminSIGN',adminSIGNRoutes);
app.use('/adminLOGIN',adminLOGINRoutes);

// making a connection to database
mongoose.connect('mongodb://localhost:27017/student_grade_mgt_system')
.then(()=>console.log('database connected successfully'))
.catch((err)=>console.log(err))


app.listen(3000,(req,res)=>{
    console.log('server is on live')
})