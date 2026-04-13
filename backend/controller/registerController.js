const { Mongoose } = require("mongoose");
const { users } = require("../model/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username: uname, password, email, userType = "user" } = req.body;

  if (!uname || !password || !email || !userType) {
    if (!uname)
      return res.status(400).send({ error: "please enter your username " });
    else if (!password)
      return res.status(400).send({ error: "please enter your password " });
    else if (!email)
      return res.status(400).send({ error: "please enter your email " });
  }

  const existingUser = await users.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .send({ error: "User already with this email exists " });
  }

  //Hahing using bcrypt
  // bcrypt is one way hashing
  // Add algorithm version,cost(rounds),salt to the password
  // Generate ====> algorithm version,cost(rounds),salt, hashValue

  //compare only hashvalues with salt and cost  ====> no decryption in bcrypt
  const hashPassword = bcrypt.hashSync(password, 10);

  let newUser;

  try {
    // create JWT Token
    // jwt -> Headers, payload, secretKEy
    // jwt.sign(payload, secretOrPrivateKey, options (ex: headers, max-age etc..));
    let accessToken, refreshToken;
    try {
      accessToken = jwt.sign(
        { email: email, username: uname },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" },
      );

      refreshToken = jwt.sign(
        { email: email, username: uname },
        process.env.Refresh_SECRET_KEY,
        { expiresIn: "7d" },
      );
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
    } catch (errorr) {
      let err = new Error();
      err.message = "issue wwhile creating jwt token";
      err.status = 500;
      throw err;
    }

    try {
      newUser = await users.create({
        username: uname,
        password: hashPassword,
        email: email,
        userType: userType,
        refreshToken,
        issuedAt: Date.now(), // in  milliseconds since 1 Jan 1970 (Unix epoch)
        //new Date() =====> Date object
        maximumDateForToken: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      console.log(
        "new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), : ",
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      );
      console.log("newUser : ", newUser);
    } catch (err) {
      //         throw new Error({ message: "User exists", statusCode: 400 });
      // Internally, JavaScript converts the object to a string.
      // So your error message becomes:  "[object Object]"

      let error = new Error(
        "Unable to register, please try again some issue with backend while creating user",
      );
      error.status = 500;
      throw error;
    }

    // set-cookie ====> res.setHeader({"set-Cookie": "token":token})
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // XSS attacks,not js cannot access it
      secure: false, // if true and samesite:strict ====> then not able to see cookie in res header and in next req header
      sameSite: "lax",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).send({
      message: "Registartion successFull",
      status: true,
      username: uname,
    });

    //or////////////////////////////////////////////////////////
    // res.cookie("accessToken", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "Strict",
    // });
    ////////////////////////////////////////////////////////////
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { register };

//////////////////////////////////////////////////////////////////////
// When user first logs in, store:

// {
//   userId: 123,
//   refreshToken: "...",
//   expiresAt: Date.now() + 7days,
//   absoluteExpiry: Date.now() + 30days
// }

// In /refresh:

// if (Date.now() > absoluteExpiry) {
//    forceLogin();
// }
//////////////////////////////////////////////////////////////////////

////////////////////////=====>  once chatgpt jwt along with sessions
