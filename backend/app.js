const express = require("express");
const { generate_codeFile } = require("./utils/generate_codeFile"); //destructuring the generate_codeFile function from the generate_codeFile.js file
// executes entire file from top-bottom and export it to here
const { execute_cpp, execute_java } = require("./utils/execute_code");
const { router: routes } = require("./routes/routes");
const { ojDbConnection } = require("./database/OjDb");
const { users } = require("./model/usersModel");
const cors = require("cors");
const app = express();

const cookiePaser = require("cookie-parser");
const dotEnv = require("dotenv");
const { verifyToken } = require("./controller/verifyTokenController");
dotEnv.config();
app.use(cookiePaser());

//middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/////////////////////////
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
ojDbConnection();

app.get("/dropCollection", async (req, res) => {
  try {
    console.log("Deleting all users from collection");
    // const isCollectionDeleted = await users.collection.drop();   ===> delete collectoin as well
    const isCollectionDeleted = await users.deleteMany({});
    console.log("isCollectionDeleted");
    console.log(isCollectionDeleted);
    res.send("Deleted all users from collection");
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
});

app.get("/profile", verifyToken, (req, res) => {
  res.send({ name: req.user.username, userType: req.user.userType });
});

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
