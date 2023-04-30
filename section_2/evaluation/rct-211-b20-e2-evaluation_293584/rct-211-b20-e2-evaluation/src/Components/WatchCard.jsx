import React from "react";
import { Link } from "react-router-dom";

const WatchCard = ({ id , image,name,category }) => {
  return (
    <Link to={`/watches/${id}`}><div data-testid={`watch-card-wrapper-${id}`}>
      <div>
        <img width={"200px"} height={"200px"} data-testid="watch-card-image" src={image} alt="" />
      </div>
      <div>
        <div data-testid="watch-name">{name}</div>
        <div data-testid="watch-category">{category}</div>
      </div>
    </div></Link>
  );
};

export default WatchCard;
