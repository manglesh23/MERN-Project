const mongoose = require("mongoose");

// const URI="mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI);
const URI = process.env.MONGODB_URI;
// const URI="mongodb+srv://mangleshyadav2:25May%402014@cluster0.fvelcgt.mongodb.net/projectDatabase?retryWrites=true&w=majority"
console.log("URI:--", URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection Successfull to the database Project collection");
  } catch (e) {
    console.log("Connection failed to database", e);
    return {
      error: true,
      details: e,
    };
  }
};

module.exports = { connectDb };
