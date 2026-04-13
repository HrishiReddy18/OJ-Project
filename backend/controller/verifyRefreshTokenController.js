const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../model/usersModel");
const dotEnv = require("dotenv");
const cookiePaser = require("cookie-parser");
dotEnv.config();

const verifyRefreshToken = async (req, res, next) => {
  try {
    //verify refresh token
    const decoded = jwt.verify(
      req.cookies.refreshToken,
      process.env.REFRESH_SECRET_KEY,
    );
    console.log("decoded", decoded);

    //check if user exists and get the refreshToken
    const user = await users.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const refreshToken = user.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    //compare refresh tokens
    if (refreshToken !== req.cookies.refreshToken) {
      return res.status(401).json({ message: "Refresh token does not match" });
    }

    if (new Date(Date.now()) > new Date(user.maximumDateForToken)) {
      console.log("refresh time Up");
      console.log(new Date(Date.now()) + " > " + user.maximumDateForToken);

      return res.status(401).json({ message: "Need to Login Again" });
    }

    //generate new access token
    const accessToken = jwt.sign(
      { email: decoded.email, username: decoded.username },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "15m" },
    );

    //set new access token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    //generate new refresh token
    const newRefreshToken = jwt.sign(
      { email: decoded.email, username: decoded.username },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "7d" },
    );

    //set new refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    //update refresh token in DB
    console.log("updating refreshToken in DB");
    const updateUser = await users.updateOne(
      { username: decoded.username },
      { $set: { refreshToken: newRefreshToken } },
    );

    req.user = user;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired, Need to Login Again",
        err: err.message,
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res
        .status(403)
        .json({ message: "Invalid token, Login Again", err: err.message });
    }

    return res.status(500).json({ message: "Auth error", err: err.message });
  }
};

module.exports = { verifyRefreshToken };
