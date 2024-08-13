import React from "react";
import packageImg from "../assets/images/package.png";
import { Link } from "react-router-dom";

const Package = ({ packageName, packageDetails, packageLink }) => {
  let imgSrc = `https://img.shields.io/npm/dw/${packageName}`;
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap-reverse">
      <div className="w-[500px]">
        <h1 className="text-xl font-roboto font-bold">{packageName}</h1>
        <p className="w-full xl:w-[585px] text-justify md:text-left pt-2 pb-2 text-base text-textColor font-normal font-openSans leading-[135%]">
          {packageDetails}
        </p>
        <img src={imgSrc} alt={packageName} />
        <div className="pt-2">
          <Link
            className="text-primary decoration-solid underline"
            to={packageLink}
            target="_blank"
          >
            Package Link
          </Link>
        </div>
      </div>
      <div className="w-[200px] h-[200px]">
        <img className="h-fll w-full object-cover" src={packageImg} alt="" />
      </div>
    </div>
  );
};

export default Package;
