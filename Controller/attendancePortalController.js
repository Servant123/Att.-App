
const bodyParser = require('body-parser');
const Student= require('../models/students.js');
const mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: false });




module.exports=function(app){


  app.get('/attendance',function(req,res)
  {

    res.render('attendance');

  });

  app.get('/attendancePortal',function(req,res)
  {

    res.render('attendancePortal');

  });

  app.post('/attendance', urlencodedParser, function(req,res){
  //  console.log(req.body);
    var present = req.body.present.split(",");
    var date= req.body.date;
      //console.log(date);

  for(var i=1; i< present.length ; i++)
  {
    var datesOfAbs="";
    if(i<10){
    var rollNo = "16EC20" + i;
    }
    else{
      rollNo = "16EC2"+i;
    }
    var daysPresent = 0;
    daysPresent += present[i];

    if(present[i] == 0){
      console.log(present[i]);
      datesOfAbs += date ;
    }
    else{
      datesOfAbs += "";
    }


    Student.findOneAndUpdate({"rollNo": rollNo}, {"$inc":{"daysPresent" : present[i]},"$push":{"datesOfAbs": datesOfAbs }}).then(function(result){console.log(result)});
  }

    res.render('attendanceSuccess');

  });


  app.get('/attendanceStatus',function(req,res)
  {
    Student.find({},function(err,data){
      var orderedData= data.sort(function(a,b){
        a=a.rollNo;
        b=b.rollNo;
        return (a < b) ? -1 : (a > b) ? 1 : 0; //if a less than or equal to b do not swap else swap
      });
      //console.log(orderedData);
        res.render('attendanceStatus',{orderedData:orderedData});
    });



  });











}
