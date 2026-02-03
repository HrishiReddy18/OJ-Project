const express = require("express");
const { compileCode } = require("../controller/compilerController");
const router = express.Router();

router.post("/", compileCode);
module.exports = router;
