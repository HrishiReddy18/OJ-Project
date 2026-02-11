const express = require("express");
const { submitCode } = require("../controller/submitController");
const router = express.Router();

router.post("/", submitCode);

module.exports = { router };
