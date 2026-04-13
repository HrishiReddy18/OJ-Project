import React, { useContext, useEffect } from "react";
import { userContext } from "../../../shared/userNameContext.jsx";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, setName, logOut: contextLogOut } = useContext(userContext);
  const navigate = useNavigate();

  const getProfile = async () => {
    const data = await fetch("http://localhost:3000/profile", {
      method: "GET",
      credentials: "include",
    });

    const jsonData = await data.json();
    console.log(jsonData);
    const username = jsonData.name;
    const userType = jsonData.userType;
    setName({ username, userType });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    contextLogOut(null);
    navigate("/login");
  };

  return (
    <div className="nav-bar-container">
      <div className="logo">
        <img src="{null}" alt="LOGO" />
      </div>
      <div className="section">
        <ul className="nav-list">
          <li className="username profile">{user?.username}</li>
          <li className="logOut">
            {" "}
            <button onClick={(e) => logOut(e)}> logOut</button>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
