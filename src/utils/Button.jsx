import React from "react";

const Button = ({ title }) => {
  return (
    <button className="px-5 py-3 bg-primary text-xl text-buttonText font-bold font-openSans uppercase">
      {title}
    </button>
  );
};

export default Button;
