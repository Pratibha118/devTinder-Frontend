import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [imageURL, setImageURL] = useState(user.imageURL);
  const [errorMessage, setErrorMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //clear error
    setErrorMessage("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          imageURL,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setErrorMessage(err?.response?.data);
    }
  };

  const handleAge = (value) => {
    if (value > 17) {
      setAge(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Age should be greater than 18");
    }
  };

  const handleGender = (value) => {
    setGender(value);
    document.activeElement.blur();
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center my-4 mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <fieldset className="fieldset">
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
                <legend className="fieldset-legend">Photo</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Photo"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                />
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => handleAge(e.target.value)}
                />
                <legend className="fieldset-legend">Gender</legend>

                <button
                  className="btn mr-3"
                  popoverTarget="popover-1"
                  style={
                    { anchorName: "--anchor-1" } /* as React.CSSProperties */
                  }
                >
                  {gender}
                </button>

                <ul
                  className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                  popover="auto"
                  id="popover-1"
                  style={
                    {
                      positionAnchor: "--anchor-1",
                    } /* as React.CSSProperties */
                  }
                >
                  <li>
                    <a onClick={() => handleGender("female")}>Female</a>
                  </li>
                  <li>
                    <a onClick={() => handleGender("male")}>Male</a>
                  </li>
                </ul>

                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <></>
              )}
              <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, imageURL, age, gender, about }}
        />
      </div>
      {showToast ? (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{user.firstName} your profile updated successfuly.</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditProfile;
