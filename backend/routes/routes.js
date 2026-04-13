const express = require("express");
const { compileCode } = require("../controller/compilerController");
const { submitCode } = require("../controller/submitController");
const { register } = require("../controller/registerController");
const { login } = require("../controller/loginController");
const { getProblems } = require("../controller/getProblemsController");
const { getProblemById } = require("../controller/getProblemById");

const {
  verifyToken: verifyTokenMiddleWare,
} = require("../controller/verifyTokenController");
const { addProblem } = require("../controller/addProblem");
const router = express.Router();

router.post("/run", compileCode);
router.post("/submit", submitCode);
router.post("/register", register);
router.post("/login", login);
router.get("/problems", verifyTokenMiddleWare, getProblems);
router.post("/problem", verifyTokenMiddleWare, addProblem);
// router.get("/problem/:id", verifyTokenMiddleWare, getProblemById);

module.exports = { router };
