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
const studregRoutes = require('./route/studreg.route');
const newDeptRoutes = require('./route/newDept.route');
const deptFetchRoutes = require('./route/deptFetch.route');
//const batchRoutes = require('./route/batch.route'); // your batch.route.js
const deptRoutes = require('./route/deptFetch.route');


//using routes file
app.use('/adminfirst',adminFirstpageRoutes);
app.use('/adminSIGN',adminSIGNRoutes);
app.use('/adminLOGIN',adminLOGINRoutes);
app.use('/studreg',studregRoutes);
app.use('/newDept',newDeptRoutes);
app.use('/deptFetch',deptFetchRoutes);
//app.use('/deptFetch', batchRoutes);
app.use('/dept', deptRoutes); // now /dept and /dept/:id will work


// making a connection to database
mongoose.connect('mongodb://localhost:27017/student_grade_mgt_system')
.then(()=>console.log('database connected successfully'))
.catch((err)=>console.log(err))


app.listen(3000,(req,res)=>{
    console.log('server is on live')
})