const User = require("../models/user_schema");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
console.log("user:-", User);
console.log("Testing for Git");

///Home
const home = async (req, res) => {
  try {
    res.status(200).send("Controllers Routing Home Page");
  } catch (e) {
    console.log("Error");
  }
};

//Register Login
const register = async (req, res) => {
  try {
    console.log("User Registration Data:-", req.body);

    const { username, email, password, mobile, isAdmin, managerId } = req.body;
    // console.log(req.body.username);

    let userExist = await User.findOne({ mobile: mobile });

    if (userExist) {
      console.log("Mobile Number Exists", userExist);
      return res.status(400).json({ message: "Mobile No Already exits" });
    }

    // let hashpassword= await bcrypt.hash(password, 10)
    // console.log("Hash Password:-",hashpassword);

    const userCreated = await User.create({
      username,
      email,
      mobile,
      password,
      isAdmin,
      managerId,
    });

    res.status(201).json({
      message: userCreated,
      token: await userCreated.generateToken(),
      userid: userCreated._id.toString(),
    });
    console.log("user crreated");
    //    res.status(200).json({message:req.body});
  } catch (e) {
    console.log("Error page not found register", e);
    res.status(404).json({ message: `Not Found Register ${e}` });
  }
};

//login
const login = async (req, res) => {
  try {
    console.log("login called");
    console.log("request:-", req.body);
    const { username, mobile, password } = req.body;
    let checkUserExist = await User.findOne({
      username: username,
      mobile: mobile,
    });
    console.log("check User Exist:-", checkUserExist);

    if (checkUserExist) {
      let userPassword = await bcrypt.compare(
        password,
        checkUserExist.password
      ); //Compare the password

      if (userPassword) {
        console.log("Login Ho gya");
        res.status(201).json({
          message: "Login Successfully",
          isAdmin: checkUserExist.isAdmin,
        });
        if (checkUserExist.isAdmin === true) {
          console.log("call register page");
          router.route("/register").post(register);
        } else {
          console.log("You are not admin");
        }
      } else {
        res.status(201).json({ message: " password didn't match" });
      }
    } else {
      res.status(201).json({ message: "Register First" });
    }
  } catch (e) {
    console.log("Login Falied try again", e);
    res.status(404).json({ message: e });
  }
};

const getData = async (req, res) => {
  try {
    console.log("Request Body:-", req.body);
    const {mobile,loginId } = req.body;
    let checkUserExist = await User.find({ mobile: mobile });
    console.log("Check User List:-", checkUserExist);
    if (!checkUserExist.length) {
      return res.status(201).json({ message: "You Are not authorised" });
    }
    if (checkUserExist && checkUserExist[0].isAdmin === true) {
      let getdata = await User.find();
      console.log("Get Data:-", getdata);
      res.status(201).json({ message: getdata, totalData: getdata.length });
    } else {
      let getdata = await User.find({managerId:loginId});
      console.log("Get Data for you:-", getdata);
      res.status(201).json({ message: getdata, totalData: getdata.length });
      // res.status(201).json({ message: "Nahi Koi Data tere liye" });
    }
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const getDataAdmin=async(req,res)=>{
  try{
    let getAdminData= await User.find({isAdmin:true});
    console.log("Get Admin Data:-",getAdminData);
    let getDetails = getAdminData.filter(item=>item.username);
    console.log("get Details:-",getDetails,getDetails.length);
    res.status(201).json({message:getDetails,totalData:getDetails.length});
  }catch(e){
    console.log(e);
    res.status(201).json({message:"NO data"});
  }
}

module.exports = { home, register, login, getData,getDataAdmin };
