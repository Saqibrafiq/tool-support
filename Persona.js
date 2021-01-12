const mongoose = require("mongoose");

const personaSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name:String,
  prof:String,
  age: Number,
  gender: String,
  address: String,
  education: String,
  status: String,
  dob: String,
  hobbies:String,
  languages:String,
  intro_name:String,
  intro_desc:String,
  nationality:String,
  interests:String,
  ed_sc_date:String,
  ed_school:String,
  ed_college:String,
  ed_uni_date:String,
  ed_uni_title:String,
  ed_uni_desc:String,
  ed_ms_date:String,
  ed_ms_uni:String,
  ed_ms_desc:String,
  work_date:String,
  work_title:String,
  work:String,
  work2_date:String,
  work2_title:String,
  work2:String,
  work3_date:String,
  work3_title:String,
  work3:String,

});


module.exports = mongoose.model('Persona',personaSchema);