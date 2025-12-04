import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, skills, imageURL } = user;
  return (
    <div className="flex justify-center my-4">
      <div className="card bg-base-300 w-60 shadow-sm">
        <figure>
          <img
            src={imageURL}
            alt="userImage"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          { age && gender ? <span>{age +" " +gender}</span> : <></>}
          {skills?.map(skill=><span>{skill}</span>)}
          <span>{about}</span>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Intrested</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
