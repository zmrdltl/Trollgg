import React from "react";

const Hello = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.birth}</p>
      <p>{props.gender}</p>
    </div>
  );
};

export default Hello;
