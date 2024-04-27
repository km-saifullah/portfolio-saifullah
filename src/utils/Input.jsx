import React from "react";

const Input = ({ className, type, name, value, onChange, placeholder }) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      onCahange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
