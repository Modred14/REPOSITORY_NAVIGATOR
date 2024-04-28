import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import image from "./assets/notfound.png";

const NotFound = () => {
  return (
    <div className="notfound">
      <div>
        {" "}
        <img className="image2" src={image} />
      </div>
      <div className="grid">
        <div className="not-found-container">
          <p className="not-found-title">404</p>
          <p className="not-found-title2">Not Found</p>
          <p className="not-found-message">
            Sorry, the page you are looking for does not exist. Go back to{" "}
            <Link className="not-found-link" to="/">
              homepage
            </Link>
            .
          </p>
        </div>
        <div>
          {" "}
          <img className="image" src={image} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
