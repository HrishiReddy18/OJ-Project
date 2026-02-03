const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// const currentWorkingDirectory = process.cwd();
const codesDirectory = path.join(__dirname, "../codes");
console.log("codesDirectory : ", codesDirectory);
//checking if the codes directory exists
if (!fs.existsSync(codesDirectory)) {
  //creating the codes directory
  fs.mkdirSync(codesDirectory, { recursive: true });
}

const generate_codeFile = (language, code) => {
  console.log("codesDirectory : ", codesDirectory);
  const unique_name = uuidv4();
  let filePath = "";
  if (language == "java") {
    fs.mkdirSync(`${codesDirectory}/${unique_name}`, { recursive: true });
    filePath = path.join(`${codesDirectory}/${unique_name}`, `Main.java`);
  } else if (language == "cpp" || language == "python") {
    if (language == "python") {
      language = "py";
    }
    const fileName = `${unique_name}.${language}`;
    filePath = path.join(codesDirectory, fileName);
  } else {
  }

  fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = {
  generate_codeFile,
};
