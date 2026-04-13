import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./login.scss";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    const isLoggedIn = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    const data = await isLoggedIn.json();
    console.log(data);
    // logIn({ username });

    if (data) {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <div className="background"></div>

      <div className="login-conatiner">
        <form className="login-form">
          <div className="codeChey-logo">
            <img src={null} alt="codeChey" />
          </div>
          <div className="username">
            <label htmlFor="username"> username: </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>

          <div className="password">
            <label htmlFor="password"> password: </label>

            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button
            type="button"
            onClick={(e) => {
              login(e);
            }}
          >
            {" "}
            Login in{" "}
          </button>
        </form>

        <div className="link-container">
          New user ?
          <Link to="/register" className="link">
            sign up
          </Link>
        </div>

        {/* <div className="link-container">
        New user ?
        <Link to="/register" className="link">
          sign up
        </Link>
      </div>

      <Routes>
        <Route path="/register" element={<Register></Register>} />
      </Routes> */}
      </div>
    </div>
  );
}

export default Login;

/////////////////////////////////////////////////////////////////////////////////
// refreah token
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401) {
//       await axios.post("/refresh");
//       return axios(error.config); // retry original request
//     }
//     return Promise.reject(error);
//   },
// );
/////////////////////////////////////////////////////////////////////////////////
