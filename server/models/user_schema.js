const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const zod=require("zod");

const userSchemaZod = zod.object({            ///zod integration for validation
  username: zod.string().min(3).max(50),
  email: zod.string().email(),
  mobile: zod.string().length(10),
  password: zod.string().min(6),
  isAdmin: zod.boolean(),
  managerId: zod.string()
});


let userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  managerId:{
    type:String,
    require:true
  }
});
//Password hashing
userSchema.pre("save", async function (next) {
  console.log("This:-", this);
  let user = this;
  

  if (!user.isModified("password")) {
    return next();
  }
  
  try {
    userSchemaZod.parse({
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      isAdmin: user.isAdmin,
      managerId: user.managerId
    });

    let hashpassword = await bcrypt.hash(user.password, 10);
    user.password = hashpassword;
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.generateToken= async function(){
 try{
  return jwt.sign({
    userid:this._id.toString(),
    name:this.username,
    mobile:this.email
  },
  process.env.JWT_SECRET_KEY,
  {
    expiresIn:'5m'
  }
  );
 }catch(e){
  console.log("Josn Web token Failure");
  console.error(e);
 }
}
const User = new mongoose.model("user", userSchema);

module.exports = User;
