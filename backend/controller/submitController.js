const problemModel = require("../model/problemModel");
const {
  execute_java,
  execute_cpp,
  execute_python,
} = require("../utils/execute_code");
const {
  generate_codeFile,
  generate_inputFile,
} = require("../utils/generate_codeFile");
const normalizeInput = require("../utils/normaliseInput");
const { currentCode } = require("../utils/enums");

const submitCode = async (req, res) => {
  const { language, code, problemId } = req.body;
  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  console.log(language, code);

  let ans = "";
  // evaluating the file

  // Checking for all the test cases one by one
  try {
    const problem = await problemModel.findById(problemId);
    const testCases = problem.testCases;
    console.log(testCases);
    if (testCases.length == 0) {
      return res
        .status(200)
        .json({ message: "No test Cases for this problem" });
    }

    let codeGenerated = false;
    let _inputfilePath = "",
      _codeFilePath = "";
    let response = [];
    for (const [idx, testCase] of testCases.entries()) {
      const { input, output } = testCase;
      const normalisedInput = normalizeInput(input);
      const stdin = normalisedInput.join("\n"); // ✅ convert to string
      console.log("stdIn: ", stdin);

      if (!codeGenerated) {
        const { inputfilePath, codeFilePath } = generate_codeFile(
          language,
          code,
          stdin,
        );
        console.log("line 51", codeFilePath);
        _inputfilePath = inputfilePath;
        _codeFilePath = codeFilePath;
        codeGenerated = true;
      } else {
        const { inputfilePath } = generate_inputFile(stdin);
        _inputfilePath = inputfilePath;
      }

      console.log("codeFilePath line 59: ", _codeFilePath);

      const executeFun = currentCode[language];
      console.log(executeFun);
      console.log(typeof executeFun);
      let result = await executeFun(_inputfilePath, _codeFilePath, stdin);
      console.log("result :", result);
      console.log("output :", output);
      console.log("typeof result :", typeof result);

      //compare each and every test case:
      const errDetails = {};
      if (result == output) {
        errDetails.status = true;
        console.log("PASSED");
        response.push(errDetails);
      } else {
        errDetails.input = input;
        errDetails.expectedOutput = output;
        errDetails.output = result;
        errDetails.status = false;
        errDetails.tcNumber = idx + 1;
        console.log("FAILED");
        response.push(errDetails);
      }

      // if (result !== output) {
      //   return res.status(400).json({ error: "Test case failed" });
      // }
    }

    console.log(JSON.stringify(response));
    const verdict = response.every((x) => x.status == true);
    if (verdict)
      return res
        .status(200)
        .json({ status: true, message: "All test cases passed" });
    else {
      const wrongAnser = response.find((x) => x.status == false);
      return res.status(200).json({
        status: false,
        message: `Wrong Answer at test case ${wrongAnser.tcNumber} : ${wrongAnser.input}`,
      });
    }
  } catch (err) {
    console.log("error : line 55 in submitController");
    return res.status(500).json({
      "error-message": err.message,
      error: err.err,
      status: false,
    });
  }
  return res.status(200).json({ language, code });
};

module.exports = { submitCode };
// export default submitCode;
