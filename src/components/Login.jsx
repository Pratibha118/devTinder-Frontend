import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
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
      setErrorMessage(err?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setErrorMessage(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <fieldset className="fieldset">
            {!isLoginForm ? (
              <>
                <legend className="fieldset-legend">First name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <legend className="fieldset-legend">Last name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            ) : (
              <></>
            )}

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
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          {errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <></>
          )}
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <div
            className="m-auto cursor-pointer"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            <p>
              {isLoginForm
                ? "New User? SignUp here"
                : "Existing User? Login here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
