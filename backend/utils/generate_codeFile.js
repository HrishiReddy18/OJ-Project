const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// const currentWorkingDirectory = process.cwd();
// creating the path
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
  if (input) {
    const fileName = `${unique_name}.txt`;
    // creating the path
    inputfilePath = path.join(inputDirectory, fileName);
    // writing the content into the file
    fs.writeFileSync(inputfilePath, input);
  }

  let outputfilePath = "";

  if (language == "java") {
    fs.mkdirSync(`${codesDirectory}/${unique_name}`, { recursive: true });
    outputfilePath = path.join(`${codesDirectory}/${unique_name}`, `Main.java`);
  } else if (language == "cpp" || language == "python") {
    if (language == "python") {
      language = "py";
    }
    const fileName = `${unique_name}.${language}`;
    outputfilePath = path.join(codesDirectory, fileName);
  } else {
  }

  // to write content into the file
  fs.writeFileSync(outputfilePath, code);

  return { inputfilePath, outputfilePath };
};

module.exports = {
  generate_codeFile,
};
