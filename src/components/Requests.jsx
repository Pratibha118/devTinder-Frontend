import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/store/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    console.log('first')
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      //todo
    }
  };

  const getRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res?.data?.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <h1 className="text-center text-bold text-white  text-2xl">
        No requests found
      </h1>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, imageURL, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img src={imageURL} className="w-20 h-20 rounded-full" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex gap-3">
              <button
                className="btn btn-primary rounded-xl"
                onClick={() => reviewRequests("rejected", request?._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary rounded-xl"
                onClick={() => reviewRequests("accepted", request?._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
