import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();
console.log(feed)
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

  return <div>{feed ? <UserCard user={feed[0]}/> : <></>}</div>;
};

export default Feed;
