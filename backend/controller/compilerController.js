const {
  execute_java,
  execute_cpp,
  execute_python,
} = require("../utils/execute_code");
const { generate_codeFile } = require("../utils/generate_codeFile");

const compileCode = async (req, res) => {
  const { language, code } = req.body;
  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  console.log(language, code);

  const filePath = generate_codeFile(language, code);
  console.log("codeFile: ", filePath);

  let ans = "";
  // evaluating the file
  switch (language) {
    case "cpp":
      execute_cpp(filePath).then(
        (value) => {
          console.log("value " + value);
        },
        (reason) => {
          console.log("reason " + JSON.stringify(reason));
        }
      );

      break;

    case "java":
      execute_java(filePath).then(
        (value) => {
          console.log("value " + value);
        },
        (reason) => {
          console.log("reason " + JSON.stringify(reason));
        }
      );
      break;

    case "python":
      execute_python(filePath).then(
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

module.exports = { compileCode };
