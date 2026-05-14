const path = require("path");
const fs = require("fs");
//importing v4 as uuidv4 from uuid module
const { v4: uuidv4 } = require("uuid");

const currentWorkingDirectory = process.cwd();
console.log("process.cwd() : ", process.cwd());
// creating the path
console.log("__dirname : ", __dirname);
const codesDirectory = path.join(__dirname, "../codes");
console.log("codesDirectory : ", codesDirectory);
//checking if the codes directory exists
if (!fs.existsSync(codesDirectory)) {
  //creating the codes directory
  fs.mkdirSync(codesDirectory, { recursive: true });
}

// const currentWorkingDirectory = process.cwd();
const inputDirectory = path.join(__dirname, "../inputs");
console.log("inputDirectory : ", inputDirectory);
//checking if the codes directory exists
if (!fs.existsSync(inputDirectory)) {
  //creating the inputs directory
  fs.mkdirSync(inputDirectory, { recursive: true });
}

const generate_codeFile = (language, code, input = null) => {
  const unique_name = uuidv4();
  let inputfilePath = "";

  //There should be one atleast one default input, so that the code can be return the response
  //Or else the code will wait the inputs

  // Creating direct input
  if (input) {
    const fileName = `${unique_name}.txt`;
    // creating the path
    inputfilePath = path.join(inputDirectory, fileName);
    // writing the content into the file
    fs.writeFileSync(inputfilePath, input);
  }

  let codeFilePath = "";

  if (language == "java") {
    fs.mkdirSync(`${codesDirectory}/${unique_name}`, { recursive: true });
    codeFilePath = path.join(`${codesDirectory}/${unique_name}`, `Main.java`);
  } else if (language == "cpp" || language == "python") {
    if (language == "python") {
      language = "py";
    }
    const fileName = `${unique_name}.${language}`;
    codeFilePath = path.join(codesDirectory, fileName);
  } else {
  }

  // to write content into the file
  fs.writeFileSync(codeFilePath, code);

  return { inputfilePath, codeFilePath };
};

const generate_inputFile = (input) => {
  let inputfilePath = "";
  const unique_name = `${uuidv4()}.txt`;
  inputfilePath = path.join(inputDirectory, unique_name);
  fs.writeFileSync(inputfilePath, input);
  return { inputfilePath };
};
module.exports = {
  generate_codeFile,
  generate_inputFile,
};
