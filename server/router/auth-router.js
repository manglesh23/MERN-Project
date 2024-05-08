const express=require('express');
const router=express.Router();
const {home,register,login,getData,getDataAdmin}=require("../controllers/auth-controllers");//controllers

router.route("/").get(home);
router.route("/register").post(register);//to send data
router.route("/login").post(login);
router.route("/getData").get(getData);
router.route("/getDataAdmin").get(getDataAdmin);

// router.get("/",(req,res)=>{
//     res.status(200).send("Router is Runing");
// });

// router.route("/").get((req,res)=>{
//     res.status(200).send("Router is Runing For Home Page");
// });



// router.route("/register").get((req,res)=>{
//     res.status(200).send("For Your Registrations");
// });

module.exports=router; 