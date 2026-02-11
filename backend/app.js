const express = require("express");
const { generate_codeFile } = require("./utils/generate_codeFile"); //destructuring the generate_codeFile function from the generate_codeFile.js file
// executes entire file from top-bottom and export it to here
const { execute_cpp, execute_java } = require("./utils/execute_code");
const run_routes = require("./routes/runRoutes");
const { router: submit_route } = require("./routes/submitRoutes");
const router = require("./routes/runRoutes");

const app = express();

//middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello !. This is OJ project");
});

app.use("/run", run_routes);
// app.post("/run", async (req, res) => {
//   const { language, code } = req.body;
//   if (code === undefined || !code) {
//     return res.status(400).json({ success: false, error: "Empty code body!" });
//   }
//   console.log(language, code);

//   const filePath = generate_codeFile(language, code);
//   console.log("codeFile: ", filePath);

//   let ans = "";
//   // evaluating the file
//   switch (language) {
//     case "cpp":
//       execute_cpp(filePath).then(
//         (value) => {
//           console.log("value " + value);
//         },
//         (reason) => {
//           console.log("reason " + JSON.stringify(reason));
//         }
//       );

//       break;

//     case "java":
//       execute_java(filePath).then(
//         (value) => {
//           console.log("value " + value);
//         },
//         (reason) => {
//           console.log("reason " + JSON.stringify(reason));
//         }
//       );
//       break;

//     case "python":
//       execute_python(filePath).then(
//         (value) => {
//           console.log("value " + value);
//         },
//         (reason) => {
//           console.log("reason " + JSON.stringify(reason));
//         }
//       );
//       break;

//     default:
//       return res
//         .status(400)
//         .json({ error: "please ensure to code in cpp, java, python" });
//   }

//   return res.status(200).json({ language, code });
// });

app.use("/submit", submit_route);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
