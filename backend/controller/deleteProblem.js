const Problem = require("../model/problemModel");
const deleteProblem = async (req, res) => {
  const id = req.params.id;
  try {
    console.log("id: ", id);
    // const problem = await Problem.findById(id);
    const problem = await Problem.findOne({ _id: id });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const deletedProblem = await Problem.deleteOne({ _id: id });
    if (!deletedProblem) {
      return res.status(500).json({ message: "something went wrong" });
    }
    res.send({ message: "Problem deleted" });
  } catch (err) {
    res.send({ message: err });
  }
};

module.exports = { deleteProblem };
