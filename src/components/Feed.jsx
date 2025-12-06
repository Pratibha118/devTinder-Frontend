import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      //TODO
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return (
      <h1 className="text-bold text-center text-2xl m-4">
        No new users found!!
      </h1>
    );

  return (
    <div>
      {feed ? (
        <>
          <h1 className="text-bold text-center text-white text-2xl m-4">
            Suggestions for you
          </h1>
          <UserCard user={feed[0]} showBtn={true} />{" "}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Feed;
