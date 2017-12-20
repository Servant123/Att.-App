const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create student schema and model

const StudentSchema = new Schema({
    rollNo : {
      type:String
    },

    daysPresent :{
      type: Number

    },

    datesOfAbs: {
      type: [String]

    }



});


const Student= mongoose.model('student', StudentSchema);

// To use in other filws
module.exports=Student;
