


var express = require('express');
var compression = require('compression');
var path = require('path');
const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const persona = require("./Persona");

mongoose.connect('mongodb://127.0.0.1:27017').then(()=>{
  console.log("connected to database");
}, (err) => {
  console.log("error occured",err);
}  );

var app = express();

app.use(express.static(__dirname + "/"));

app.enable('trust proxy');
app.use(bodyParser.urlencoded());
app.use(compression());

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'html');


//app.set('view engine', 'jade');
app.get('/', function(req, res) {
    res.header('Cache-Control', "max-age=60, must-revalidate, private");
    res.sendFile( path.join(__dirname, 'index.html') );
});

app.get('/Persona', function(req, res) {
    res.header('Cache-Control', "max-age=60, must-revalidate, private");
    console.log("running in node js")

    res.sendFile( path.join(__dirname, "/Persona/index.html") );
});

app.post('/getting-information',function(req,res) {
    
  console.log(req.body);
  //create_persona(req.body).then(result => res.send(result));
  create_persona(req.body).then(result => res.render('link-tab' , {data: result}));
  //res.sendFile( path.join(__dirname, 'index.html') );
});


app.get('/get_with_id',function(req,res){
    res.header('Cache-Control', "max-age=60, must-revalidate, private");
    get_data(req.query.id).then(result=>  res.render('persona-view' , {data: result}));
    
  
    // get_data(req.query.id).then(
    //     res.sendFile( path.join(__dirname, "/views/persona-view.html") )
    //    );
       
    
 } );


function get_data(id){
    return new Promise((resolve, reject) => {
       
        persona.find().where("_id").equals(id)
          .exec()
          .then(data => {
             
            if (data.length > 0) {
               
              var new_persona=new persona({
                _id:data[0]._id,
                name:data[0].name,
                prof:data[0].prof,
                age: data[0].age,
                gender: data[0].gender,
                address: data[0].address,
                education: data[0].education,
                status: data[0].status,
                intro_name:data[0].intro_name,
                intro_desc:data[0].intro_desc,
                dob: data[0].dob,
                hobbies:data[0].hobbies,
                languages:data[0].languages,
                nationality:data[0].nationality,
                interests:data[0].interests,
                ed_sc_date:data[0].ed_sc_date,
                ed_school:data[0].ed_school,
                ed_college:data[0].ed_college,
                ed_uni_date:data[0].ed_uni_date,
                ed_uni_title:data[0].ed_uni_title,
                ed_uni_desc:data[0].ed_uni_desc,
                ed_ms_date:data[0].ed_ms_date,
                ed_ms_uni:data[0].ed_ms_uni,
                ed_ms_desc:data[0].ed_ms_desc,
                work_date:data[0].work_date,
                work_title:data[0].work_title,
                work:data[0].work,
                work2_date:data[0].work2_date,
                work2_title:data[0].work2_title,
                work2:data[0].work2,
                work3_date:data[0].work3_date,
                work3_title:data[0].work3_title,
                work3:data[0].work3,
              })
              console.log(new_persona);
              resolve(new_persona);
            }else {
              reject();
            }
          }).catch(err=> {
            console.log("error ",err);
          });
      })
}
function create_persona(data) {
    return new Promise(function (resolve, reject) {

      const Persona = new persona({
        _id:mongoose.Types.ObjectId(),
        age: data.age,
        name:data.name,
        prof:data.prof,
        gender: data.gender,
        address: data.address,
        education: data.education,
        status: data.status,
        dob: data.dob,
        intro_name:data.intro_name,
        intro_desc:data.intro_desc,
        hobbies:data.hobbies,
        languages:data.languages,
        nationality:data.nationality,
        interests:data.interests,
        ed_sc_date:data.ed_sc_date,
        ed_school:data.ed_school,
        ed_college:data.ed_college,
        ed_uni_date:data.ed_uni_date,
        ed_uni_title:data.ed_uni_title,
        ed_uni_desc:data.ed_uni_desc,
        ed_ms_date:data.ed_ms_date,
        ed_ms_uni:data.ed_ms_uni,
        ed_ms_desc:data.ed_ms_desc,
        work_date:data.work_date,
        work_title:data.work_title,
        work:data.work,
        work2_date:data.work2_date,
        work2_title:data.work2_title,
        work2:data.work2,
        work3_date:data.work3_date,
        work3_title:data.work3_title,
        work3:data.work3,
      });
      
      Persona.save().then(result => {
        resolve("http:localhost:5000/get_with_id?id="+result._id);
      }).catch(err => {
        reject(err);
      });
    });
  };




var server = app.listen(process.env.PORT || 5000, function () {
    var host = "localhost"
    var port = server.address().port;
    console.log(`Persona app listening at http://${host}:${port}`);
});


