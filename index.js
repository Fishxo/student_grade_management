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
const individualdepartRoutes = require('./route/individualDEPARTMENT.route');
const NEWcourseRoutes = require('./route/createNEWCOURSE.route');
const studLOGINRoutes = require('./route/studLOGIN.route');
const editRoutes = require('./route/STUDENT.route');
const batchesRoutes = require('./route/batches.route');
const courseeditRoutes = require('./route/createNEWCOURSE.route');
const assignCOURSERoutes = require('./route/ASSIGNCOURSE.route');
const assigncOURSERoutes = require('./route/ASSIGNCOURSE.route');
const assignGRADERoutes = require('./route/GRADESUBMITION.route');
const studentProfileRoutes = require('./route/studentProfile.route');
const studentPRofileRoutes = require('./route/studentProfile.route');
const studnetPROfileRoutes = require('./route/studentProfile.route');
const studentPROFIleRoutes = require('./route/studentProfile.route');
const GRADEeidtRoutes = require('./route/GRADESUBMITION.route');


//using routes file
app.use('/adminfirst',adminFirstpageRoutes);
app.use('/adminSIGN',adminSIGNRoutes);
app.use('/adminLOGIN',adminLOGINRoutes);
app.use('/studreg',studregRoutes);
app.use('/newDept',newDeptRoutes);
app.use('/deptFetch',deptFetchRoutes);
app.use('/dept', individualdepartRoutes); // now /dept and /dept/:id will work
app.use('/deptc',NEWcourseRoutes);
app.use('/studlogin',studLOGINRoutes);
app.use('/deptt',editRoutes);
app.use('/batch',batchesRoutes);
app.use('/Cedit',courseeditRoutes);
app.use('/assigncourse',assignCOURSERoutes);
app.use('/assc',assigncOURSERoutes);
app.use('/grade',assignGRADERoutes);
app.use('/studProfile',studentProfileRoutes)
app.use('/studeGRADE',studentPRofileRoutes);
app.use('/studCOURSE',studnetPROfileRoutes);
app.use('/studCREDIT',studentPROFIleRoutes);
app.use('/GRADEedit',GRADEeidtRoutes)
         // making sure the server is ok 
          app.get('/',(req,res)){
                   res.send('server is on live')}
// making a connection to database
mongoose.connect("mongodb+srv://fish:12345@cluster0.ezepfnl.mongodb.net/student-grade-mgt-system")

.then(()=>console.log('database connected successfully'))
.catch((err)=>console.log(err))


app.listen(3000,(req,res)=>{
    console.log('server is on live')
})
