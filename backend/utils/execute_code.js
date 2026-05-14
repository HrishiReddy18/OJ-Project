const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");
const { error } = require("console");
const { stdout } = require("process");
const { fileURLToPath } = require("url");

const executableFilesDirectory = path.join(__dirname, "../executableFiles");
if (!fs.existsSync(executableFilesDirectory)) {
  fs.mkdirSync(executableFilesDirectory, { recursive: true });
}

const execute_cpp = (inputfilePath, filePath, input) => {
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

  const executableFileName = path.basename(filePath).split(".")[0];
  // const executableFilePath = path.join(executableFilesDirectory, `${executableFileName}.exe`);
  const executableFilePath = path.join(
    executableFilesDirectory,
    `${executableFileName}`,
  );

  const execute_cmd = new Promise((resolve, reject) => {
    // exec fun in Child_process to access the termial

    //(spawn → event-driven (data, close, error)) ===> event-driven programming (on data, on close, on error)
    //  Feature  	exec	spawn
    // Shell-used	Yes	No
    // Output	Buffered	Streamed
    // Large-output	Not-good	Good
    // Security	Risky	Safer

    /////////////////////////////////
    //     What actually happens without a Promise

    // If you try:

    // function runCode(...) {
    //   const process = spawn(...);
    //   return stdout; // ❌ wrong
    // }

    // At this point:

    // process just started
    // no output has arrived yet
    // function exits immediately

    // So you'd always get empty output.
    ///////////////////////////////////////////////////////////////

    console.log("input", JSON.stringify(input));
    if (input) {
      //take source code and generate executable file
      //then run the executable file with the input file
      exec(
        // `g++ ${filePath} -o ${executableFilePath} && cd ${executableFilesDirectory} && ${executableFileName}.exe < ${inputfilePath}`,
        `g++ ${filePath} -o ${executableFilePath} && cd ${executableFilesDirectory} && ./${executableFileName} < ${inputfilePath}`,
        (error, stdout, stderr) => {
          if (error) {
            //This is error in your code
            console.log("Compilation or runtime error");
            reject({
              message: "Compilation or runtime error",
              error: error.message,
              err: error.stack,
            });
          }

          if (stderr) {
            console.log("STD ERROR");
            // If the command produce any error (if there is any error in the command)
            //This is error in your NodeJs code
            reject({ "error in the terminal": stderr });
          }

          resolve(stdout);
        },
      );
    } else {
      exec(
        // `g++ ${filePath} -o ${executableFilePath} && cd ${executableFilesDirectory} && ${executableFileName}.exe`,
        `g++ ${filePath} -o ${executableFilePath} && cd ${executableFilesDirectory} && ./${executableFileName}`,
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
            reject({ "error in the terminal": stderr });
          }

          resolve(stdout);
        },
      );
    }
  });

  return execute_cmd;
};
const execute_java = (inputfilePath, filePath) => {
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
  const executableFileName = filePath.split("\\").at(-2);
  const executableFileDir = path.join(
    executableFilesDirectory,
    executableFileName,
  );
  fs.mkdirSync(`${executableFileDir}`, { recursive: true });
  const executableFilePath = path.join(executableFileDir, `Main.class`);

  const execute_cmd = new Promise((resolve, reject) => {
    exec(
      `javac -d "${executableFileDir}" "${filePath}" && cd "${executableFileDir}" && java Main < ${inputfilePath}`,
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
      },
    );
  });

  return execute_cmd;
};

const execute_python = (inputfilePath, filePath) => {
  const execute_cmd = new Promise((resolve, reject) => {
    exec(`py "${filePath} " < "${inputfilePath}"`, (error, stdout, stderr) => {
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

/////////////////////////////////////////
//////////////////////////////////////////
