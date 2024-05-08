require("dotenv").config();//doten to protect the password
const express = require("express");

const app = express();
const { connectDb } = require("./util/db");
const router = require("./router/auth-router");

app.use(express.json()); //middleware

app.use("/", router); //router

connectDb()
  .then(() => {
    //connecting database
    app.listen("8000", () => {
      console.log("App is running on 8000");
    });
  })
  .catch((e) => {
    console.log("Database Connection Failed");
  });

// app.get("/",(req,res)=>{
//     res.status(200).send("Home page");

// });

// app.get("/about",(req,res)=>{
//     res.status(200).send("About page");

// });
