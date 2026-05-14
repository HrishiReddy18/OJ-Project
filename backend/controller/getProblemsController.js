const express = require("express");
// const {Problem} = require("../model/problemModel");  ===> if module.exports ={} ===> it is like object exporting
const Problem = require("../model/problemModel"); //===> direct export in module.exports not exporting like object
const getProblems = async (req, res) => {
  //Authentication
  //   verifyToken(req, res);

  console.log("getProblems");
  try {
    const problems = await Problem.find();
    // console.log(problems);
    res.send(problems);
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.send({ message: "Error in Problems fetching" });
  }
};

const getProblemById = async (req, res) => {
  //req.params
  // req.query
  console.log("getProblem by id");
  try {
    const problem = await Problem.findById(req.params.id);
    // console.log(problem);
    res.send(problem);
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.send({ message: "Error in Problems fetching" });
  }
};

module.exports = { getProblems, getProblemById };
