const {
  execute_java,
  execute_cpp,
  execute_python,
} = require("../utils/execute_code");
const { generate_codeFile } = require("../utils/generate_codeFile");

const submitCode = async (req, res) => {
  const { language, code, input } = req.body;
  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  console.log(language, code);

  const { inputfilePath, outputfilePath } = generate_codeFile(
    language,
    code,
    input
  );
  console.log("inputfilePath: ", inputfilePath);
  console.log("outputfilepath: ", outputfilePath);

  let ans = "";
  // evaluating the file
  switch (language) {
    case "cpp":
      execute_cpp(inputfilePath, outputfilePath).then(
        (value) => {
          console.log("value " + value);
        },
        (reason) => {
          console.log("reason " + JSON.stringify(reason));
        }
      );

      break;

    case "java":
      execute_java(inputfilePath, outputfilePath).then(
        (value) => {
          console.log("value " + value);
        },
        (reason) => {
          console.log("reason " + JSON.stringify(reason));
        }
      );
      break;

    case "python":
      execute_python(inputfilePath, outputfilePath).then(
        (value) => {
          console.log("value " + value);
        },
        (reason) => {
          console.log("reason " + JSON.stringify(reason));
        }
      );
      break;

    default:
      return res
        .status(400)
        .json({ error: "please ensure to code in cpp, java, python" });
  }

  return res.status(200).json({ language, code });
};

module.exports = { submitCode };
