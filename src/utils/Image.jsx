import React from "react";

const Image = ({ imgSrc, altText, className }) => {
  return <img src={imgSrc} alt={altText} className={className} />;
};

export default Image;
