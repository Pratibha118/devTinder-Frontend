import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/store/feedSlice";

const UserCard = ({ user, showBtn }) => {
  const { _id, firstName, lastName, age, gender, about, skills, imageURL } =
    user;
  const dispatch = useDispatch();

  const handleSendOrIgnoreRequests = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      //todo
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card bg-base-300 w-60 shadow-sm">
        <figure>
          <img src={imageURL} alt="userImage" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender ? <span>{age + " " + gender}</span> : <></>}
          {skills?.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
          <span>{about}</span>
          {showBtn ? (
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleSendOrIgnoreRequests("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSendOrIgnoreRequests("intrested", _id)}
              >
                Intrested
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
