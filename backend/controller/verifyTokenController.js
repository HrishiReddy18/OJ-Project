const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../model/usersModel");
const dotEnv = require("dotenv");
const cookiePaser = require("cookie-parser");
const app = express();
const cors = require("cors");
const { verifyRefreshToken } = require("./verifyRefreshTokenController");
dotEnv.config();
app.use(cookiePaser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const verifyToken = async (req, res, next) => {
  // console.log("req.headers.cookies", req.headers.cookie);
  // console.log("req.cookies", req.cookies);
  try {
    const decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_SECRET_KEY,
    );
    // console.log("decoded", decoded);

    const user = await users.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (new Date(Date.now()) > new Date(user.maximumDateForToken)) {
      //user.maximumDateForToken ===> Db gives this as string
      // console.log(new Date(Date.now()) + " > " + user.maximumDateForToken);
      return res.status(401).json({ message: "Need to Login Again" });
    }

    ///////////////////////////////
    console.log("user document from backEnd");
    console.log(typeof user);
    console.log(user);
    req.user = user;
    /////////////////////////////////////////
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      //refresh token
      console.log("clling refresh token");
      return verifyRefreshToken(req, res, next);
    }

    if (err.name === "JsonWebTokenError") {
      return res
        .status(403)
        .json({ message: "Invalid token", err: err.message });
    }

    if (err.name === "NotBeforeError") {
      return res
        .status(403)
        .json({ message: "Token not active", err: err.message });
    }

    return res.status(500).json({ message: "Auth error", err: err.message });
  }
};

module.exports = { verifyToken };
