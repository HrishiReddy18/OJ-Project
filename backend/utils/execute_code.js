const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");
const { error } = require("console");
const { stdout } = require("process");

const outputsDirectory = path.join(__dirname, "../outputs");
if (!fs.existsSync(outputsDirectory)) {
  fs.mkdirSync(outputsDirectory, { recursive: true });
}

const execute_cpp = (inputfilePath, filePath) => {
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
      `g++ ${filePath} -o ${outputFilePath} && cd ${outputsDirectory} && ${outputFileName}.exe < ${inputfilePath}`,
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
const execute_java = (filePath) => {
  /*
Meaning

Compile the Java source file and put the generated .class file(s) into outputFileDir.

Breakdown

javac → Java compiler

-d "${outputFileDir}" →
“Put compiled .class files into this directory”

"${filePath}" →
The Java source file (e.g. Main.java)
  */
  console.log("filepath: ", filePath);
  const outputFileName = filePath.split("\\").at(-2);
  const outputFileDir = path.join(outputsDirectory, outputFileName);
  fs.mkdirSync(`${outputFileDir}`, { recursive: true });
  const outputFilePath = path.join(outputFileDir, `Main.class`);

  const execute_cmd = new Promise((resolve, reject) => {
    exec(
      `javac -d "${outputFileDir}" "${filePath}" && cd "${outputFileDir}" && jav Main`,
      (error, stdout, stderr) => {
        if (error) {
          //This is error in your code
          console.log("84: Compilation or runtime error");
          reject({
            message: "Compilation or runtime error",
            error: error.message,
          });
          return; // prevent the further exection ====> as promise settels only once
        }

        if (stderr) {
          console.log("STD ERROR");
          // If the command produce any error (if there is any error in the command)
          reject({ "error in the terminal": stderr });
          return;
        }

        resolve(stdout);
      }
    );
  });

  return execute_cmd;
};

const execute_python = (filePath) => {
  const execute_cmd = new Promise((resolve, reject) => {
    exec(`py ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        //This is error in your code
        console.log("84: Compilation or runtime error");
        reject({
          message: "Compilation or runtime error",
          error: error.message,
        });
        return; // prevent the further exection ====> as promise settels only once
      }

      if (stderr) {
        console.log("STD ERROR");
        // If the command produce any error (if there is any error in the command)
        reject({ "error in the terminal": stderr });
        return;
      }

      resolve(stdout);
    });
  });

  return execute_cmd;
};

module.exports = { execute_cpp, execute_java, execute_python };
