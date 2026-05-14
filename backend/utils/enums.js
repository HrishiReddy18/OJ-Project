const {execute_cpp, execute_java,execute_python} = require("./execute_code.js")
const currentCode = Object.freeze({
  cpp: execute_cpp,
  java: execute_java,
  python: execute_python
});

module.exports ={currentCode}