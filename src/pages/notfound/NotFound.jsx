import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../../utils/Button";

const NotFound = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center flex-col gap-3 px-2">
      <div>
        <MdOutlineErrorOutline className="h-[150px] w-[150px] text-textColor" />
      </div>
      <p className="font-normal font-roboto text-heading text-lg py-3 text-center">The page you are looking for cannot be found!</p>
      <Link to="/">
        <Button title="Home" />
      </Link>
    </div>
  );
};

export default NotFound;
