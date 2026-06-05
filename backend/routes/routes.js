const express = require("express");
const { compileCode } = require("../controller/compilerController");
const { submitCode } = require("../controller/submitController");
const { register } = require("../controller/registerController");
const { login } = require("../controller/loginController");
const {
  getProblems,
  getProblemById,
} = require("../controller/getProblemsController");

const {
  verifyToken: verifyTokenMiddleWare,
} = require("../controller/verifyTokenController");
const { addProblem } = require("../controller/addProblem");
const { deleteProblem } = require("../controller/deleteProblem");
const { aiReview } = require("../controller/aiReview");
const router = express.Router();

router.post("/run", compileCode);
router.post("/submit", submitCode);
router.post("/register", register);
router.post("/login", login);
router.get("/problems", verifyTokenMiddleWare, getProblems);
router.post("/problem", addProblem);
router.delete("/problems/:id", verifyTokenMiddleWare, deleteProblem);
router.get("/problems/:id", verifyTokenMiddleWare, getProblemById);
router.post("/ai-review", aiReview);

module.exports = { router };
