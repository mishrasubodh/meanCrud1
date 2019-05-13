const express = require('express')
const router = express.Router();
const { userSChema, loginuser } = require('../model/student');
var bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_key = require('../variables/variables')
 const checkauth = require('../middleware/check-auth')

// for registration
router.post('/registration', (req, res, next) => {
    console.log("abc.........==",req.body);
    bcrypt.hash(req.body.password, 8).then((hash) => {
        req.body.password = hash
        console.log("def......==",req.body);
        userSChema.create(req.body).then((responce) => {
            
            console.log("hij......==",userSChema);
            const token = jwt.sign({ 
                username: responce.username,
                userId:responce._id
                     },
                     jwt_key,{
                        expiresIn : '1h'  
                     });
            let obj = {
                'message': 'Registration SuccessFull',
                token:token,
                responce
            }
            res.send(obj);
        }).catch(next);
    });
});

//for login user

router.post('/signup', async (req, res) => {
    console.log("2222222", req.body);
    userSChema.findOne({ username: req.body.username }).then((responce) => {
        console.log("111111111", responce);
        if (responce.length < 1) {
            return res.status(401).json({
                message: ' auth failed'
            });
        }
        bcrypt.compare(req.body.password, responce.password, (err, result) => {
            console.log('result', result, err)
            if (err) {
                return res.status(401).json({
                    message: 'auth failed'
                });
            }

            if (result) {
        const token = jwt.sign({ 
            username: responce.username,
            userId:responce._id
                 },
                 jwt_key,{
                    expiresIn : '1h'  
                 }
                 )
                 console.log("aaaaaaaaaaaa",token);
                 
                return res.status(200).json({
                    message: 'auth successful',
                    token:token,
                    responce

                });
            }
            return res.status(401).json({
                message: ' auth failed'
            });
        });

    })
});

// router.post('/signup', async(req,res)=>{
//     const user = await userSChema.findOne({username:req.body.username})
//     try {
//         if(!user){
//             return res.status(400).send()
//          }
//          res.status(200).send(user)
//     } catch (error) {
//         res.status(400).send()
//     }

// })


router.post('/login', (req, res, next) => {
     console.log("DDDDDDDDDDDDDDDDDDDDDDD",req.body)
    userSChema.findOne(req.body).then((responce) => {
        if (responce != null || undefined) {
            var userdata = responce;
            let = obj = {
                message: "login Successful",
                userdata
            }
            //next(responce)
            res.status(200).send({ obj });
        }
        else if (responce == null) {
            let = obj = {
                message: "user not found",
            }
            //  next(res)
            //    res.status(200).send(obj); 
        }
    }).catch(next);
});
//for Single data By id 
router.get('/databyid/:id', (req, res, next) => {
    userSChema.findById(req.params.id).then((userSChema) => {
        res.send(userSChema);
    }).catch(next);
});

//for get all users data
router.get('/allRejisterData', (req, res, next) => {
    userSChema.find().then((response) => {
        res.send(response);
    }).catch(next);
});

//for databy id
router.put('/databyid/:id', (req, res, next) => {
    // console.log("params-------------",req.params.id);
    // console.log("body---------------",req.body);
    userSChema.findByIdAndUpdate({ _id: req.params.id }, req.body).then((user) => {
        userSChema.findOne({ _id: req.params.id }).then((userSChema) => {
            res.send(userSChema);
        }).catch(next);
    })
});

//delete databy id
router.delete('/removedata/:id', (req, res, next) => { 
     console.log("idddddddddd============",req.body);
     const id = req.body._id
    userSChema.findOneAndDelete(req.body._id).then((user) => {
    console.log("resp-->", user)
        if (user !== null) {
            let obj = {
                message: 'data successfuly delete',
                user
            }
            res.status(200).send(obj);
        }
        else if (user == null) {
            let obj = {
                message: 'data not found',
                // responce
            }
            res.status(200).send(obj);
        }

    }).catch(next)
});





module.exports = router;

