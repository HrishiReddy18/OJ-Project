const problemModel = require("../model/problemModel");

const addProblem = async (req, res) => {
  console.log(req.body);
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    testCases,
    constraints,
  } = req.body;

  try {
    const newProblem = await problemModel.create({
      title,
      description,
      difficulty,
      tags,
      examples,
      testCases,
      constraints,
    });

    res.send({ message: "problem added" });
  } catch (err) {
    res.send({ message: err });
  }
};

module.exports = { addProblem };
