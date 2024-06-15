import React from "react";

const Button = ({ title }) => {
  return (
    <button className="px-5 py-2 bg-primary text-base text-buttonText font-bold font-openSans uppercase">
      {title}
    </button>
  );
};

export default Button;
