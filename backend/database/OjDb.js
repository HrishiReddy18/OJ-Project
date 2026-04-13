const mongoose = require("mongoose");

// to add .env file to process
const dotEnv = require("dotenv");
dotEnv.config();

const ojDbConnection = async () => {
  let connection;
  try {
    connection = await mongoose.connect(process.env.OJ_DB);
    // you can throw custom error message, if you want
    // console.log(connection);

    console.log("database connected");
  } catch (err) {
    console.log(connection);
    console.log(err);
    console.log(" problem in connecting to database ");
  }
};

module.exports = { ojDbConnection };
