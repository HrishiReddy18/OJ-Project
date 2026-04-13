import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import "./Register.scss";

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  // const { setUsernameContext } = useContext(userNameContext);

  const submitNewUser = async (event) => {
    event.preventDefault();
    const isRegistered = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        email,
        password,
      }),
      credentials: "include",
    });

    const data = await isRegistered.json();
    console.log(data);

    // setUsernameContext({ username: userName });
    if (data) {
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <div className="background"></div>
      <div className="register-conatiner">
        <form className="register-form" onSubmit={submitNewUser}>
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

          <div className="email">
            <label htmlFor="email"> email: </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <button type="submit"> Sign Up </button>
        </form>

        <div className="link-container">
          Already existing user ?
          <Link to="/login" className="link">
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
