const {
  execute_java,
  execute_cpp,
  execute_python,
} = require("../utils/execute_code");
const { generate_codeFile } = require("../utils/generate_codeFile");
const normalizeInput = require("../utils/normaliseInput");

const compileCode = async (req, res) => {
  // default input is null
  const { language, code, input = null } = req.body;
  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  // console.log(language, code);

  let stdIn = "";
  if (input) {
    const normalisedInput = normalizeInput(input);
    stdIn = normalisedInput.join("\n"); // ✅ convert to string
    console.log("stdIn: ", stdIn);
  }
  const { inputfilePath, codeFilePath } = generate_codeFile(
    language,
    code,
    stdIn ?? input, //always input in the editor must be based on how you read input in the code
  );
  console.log("inputfilePath: ", inputfilePath);
  console.log("codeFilePath: ", codeFilePath);

  let ans = "";
  // evaluating the file
  switch (language) {
    case "cpp":
      //////////////////////////////////////////////////////////////
      // CPP sample code
      //       #include <iostream>
      // using namespace std;
      // int main() {
      //     int num1, num2, sum;
      //     cin >> num1;
      //     cin >> num2;
      //     // Adding the two numbers
      //     sum = num1 + num2;
      //     // Displaying the result
      //     cout  << sum << endl;
      //     return 0;
      // }
      //////////////////////////////////////////////////////////////

      // execute_cpp(inputfilePath, codeFilePath, input).then(
      //   (value) => {
      //     console.log("output of code is: " + value);
      //     ans=value;
      //   },
      //   (reason) => {
      //     console.log("reason " + JSON.stringify(reason));
      //   },
      // );

      //////////////////////////////////////////////////////////////
      // await always returns result of the promise
      // .then ===> if success ===> return success value
      // .then ==> if failure ===> throws the error ===> you need to handle the error
      try {
        ans = await execute_cpp(inputfilePath, codeFilePath, input);
        console.log("output: ", ans);
      } catch (err) {
        console.log("error cpp");
        console.log(err);
        return res.status(500).json({ err });
      }
      break;

    case "java":
      try {
        ans = await execute_java(inputfilePath, codeFilePath, input);
        console.log("output: ", ans);
      } catch (err) {
        console.log("error java");
        console.log(err);
        return res.status(500).json({ err });
      }
      break;

    case "python":
      try {
        ans = await execute_python(inputfilePath, codeFilePath, input);
        console.log("output: ", ans);
      } catch (err) {
        console.log("error python");
        console.log(err);
        return res.status(500).json({ err });
      }
      break;

    default:
      return res
        .status(400)
        .json({ error: "please ensure to code in cpp, java, python" });
  }

  // return res.status(200).json({ language, code, ans });
  ans = ans.trim();
  return res.status(200).json({ ans });
};

module.exports = { compileCode };
