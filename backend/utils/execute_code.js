const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");

const outputsDirectory = path.join(__dirname, "../outputs");
if (!fs.existsSync(outputsDirectory)) {
  fs.mkdirSync(outputsDirectory, { recursive: true });
}

const execute_cpp = (filePath) => {
  /*
    1. compile ----> g++ main.cpp
    2. run -----> ./a.out or a.exe
                (or)
        Compile with custom output name (recommended)
            1. g++ main.cpp -o app.exe

            (or)
        Compile and run with custom output name (recommended)
            1. g++ main.cpp -o app && app
    */

  const outputFileName = path.basename(filePath).split(".")[0];
  const outputFilePath = path.join(outputsDirectory, `${outputFileName}.exe`);

  const execute_cmd = new Promise((resolve, reject) => {
    // exec fun in Child_process to access the termial
    exec(
      `g++ ${filePath} -o ${outputFilePath} && cd ${outputsDirectory} && ${outputFileName}.exe`,
      (error, stdout, stderr) => {
        if (error) {
          //This is error in your code
          console.log("Compilation or runtime error");
          reject({
            message: "Compilation or runtime error",
            error: error.message,
          });
        }

        if (stderr) {
          console.log("STD ERROR");
          // If the command produce any error (if there is any error in the command)
          // reject({ "error in the terminal": stderr });
        }

        resolve(stdout);
      }
    );
  });

  return execute_cmd;
};
const execute_java = (filepath) => {};

module.exports = { execute_cpp, execute_java };
