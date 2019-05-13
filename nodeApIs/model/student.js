const mongoose = require('mongoose');
const jwt =require('jsonwebtoken')

//user registration  schema
const UserSChema = new mongoose.Schema({

    firstName:{
       type: String,
       required: [true,'Name field is required']
   },
   lastName:{
    type: String
},
   username:{
    type: String,
   },
   password:{
       type: String
   }

});
//login user schema
const Loginuser = new mongoose.Schema({
    username:{
     type: String,
    },
    password:{
        type: String
    }
 });

//  UserSChema.prototype.generateAuthToken =  function(token){

//      console.log(token,'hkhkjkh')
//   return   jwt.sign({_id: user._id.toString()}, 'subodhmishra',(err,data)=>{
//          if(data){
//             console.log(data)
//             return data
//          }
//      })
     
     
//  }

const userSChema = mongoose.model('userSChema',UserSChema);
const loginuser = mongoose.model('loginuser',Loginuser);
module.exports={
    userSChema,
    loginuser
} 

