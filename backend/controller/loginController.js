const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../model/usersModel");
const dotEnv = require("dotenv");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // fetch details
    const isexistingUser = await users.findOne({ username: username });

    if (!isexistingUser) {
      res.status(400).send({ message: "user not found" });
    }

    //It compares the hashCodes using salt and cost present in encoded password
    const isValid = bcrypt.compareSync(password, isexistingUser.password);
    if (!isValid) {
      res.status(400).send({ message: "User password is In-correct" });
    }

    //JWT
    const accessToken = jwt.sign(
      {
        username: username,
        email: isexistingUser.email,
        id: isexistingUser._id,
      },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      {
        email: isexistingUser.email,
        username: isexistingUser.username,
        id: isexistingUser._id,
      },
      process.env.Refresh_SECRET_KEY,
      { expiresIn: "7d" },
    );

    //if user logged-in , update the refresh TOken  and Max expiry in DB
    const updateRefresh = await users.updateOne(
      { username: username },
      {
        $set: {
          refreshToken: refreshToken,
          maximumDateForToken: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
    );

    if (!updateRefresh) {
      // if any error  from DB or backend ===> Internal server error
      // Here we are giving custom message
      res.status(400).send({ message: "Please login later" });
    }

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.send({ message: "logged In" });
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { login };

// Stateless ==> server doesnt remember thes user btw requests
// StateFul  =====> using sessions ====> stored Inmemory or Redis (preffered)
//           ========> if  different servers in cloud horizonatl scaling, if request goes to another server it couldnt recognise the user .
//           =======> so store globally, either in Redis or database

// 1. normal sessions =====> deleted when broswer is closed
//                   ========> cookie stored in browser RAM

// 2. persistant sessions =======> max-age ? exipry sessions
//                         =======> cookie stored in disk storage of browser until it expires
