const express = require("express");
const bodyParser = require("body-parser");
//set up express app
var cors = require('cors')
const app = express();

var mongoose = require('mongoose');
//set port
port= process.env.PORT || 4000;

//database connection
mongoose.connect('mongodb://127.0.0.1:27017/students')
mongoose.Promise= global.Promise;
// use for cors error
app.use(cors());
app.use(bodyParser.json());
app.use('/api',require('./routes/api'));
// app.use((req,response,next)=>{
//     console.log('ccccccccccccccccccccccc')
//   jwt.sign({_id: user._id.toString()}, 'subodhmishra',(err,data)=>{
//      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data);
     
//     });
// });

//require apis from routers
// error hanling
app.use((err,req,res,next)=>{
  //  console.log("zzzzzzzzzzzzzzzzzz",error)
    res.status(200).send({error:err});
    });
    
//port listen
app.listen(port,()=>{
console.log('server is running on  port 4000')
});
