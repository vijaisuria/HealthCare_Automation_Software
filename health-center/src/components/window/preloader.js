import React from "react";
import "./preloader.css";

export const Preloader = () => {
  return (
    <>
      <div id="blur-container"></div>

      <div id="spinner-container" className="mt-32 md:mt-64">
        <div id="css3-spinner-svg-pulse-wrapper">
          <svg
            id="css3-spinner-svg-pulse"
            version="1.2"
            height="210"
            width="550"
            xmlns="http://www.w3.org/2000/svg"
            viewport="0 0 60 60"
          >
            <path
              id="css3-spinner-pulse"
              stroke="#DE6262"
              fill="none"
              strokeWidth="2"
              strokeLinejoin="round"
              d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
