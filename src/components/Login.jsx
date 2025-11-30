import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("tanya@gmail.com");
  const [password, setPassword] = useState("Tanya@123");
  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store?.user);
  console.log(loggedInUser);

  // const newData = {
  //   emailId: email,
  //   password: password,
  // };

  const handleLogin = async () => {
    //   try {
    //     const data = await fetch("http://localhost:3000/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json", // Tell server we're sending JSON
    //       },
    //       body: JSON.stringify(newData), //Convert JS object to JSON string
    //       withCredentials: true,
    //     });
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setErrorMessage(err?.response?.data)
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              placeholder="Email Id"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          {errorMessage ? <p className="text-red-500">{errorMessage}</p> : <></>}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
