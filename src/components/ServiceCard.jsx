import React from "react";
import Image from "../utils/Image";

const ServiceCard = ({ img, text }) => {
  return (
    <div className="bg-heading flex items-center gap-x-5 pr-6 w-[485px]">
      <div className="w-[168px]">
        <Image
          imgSrc={img}
          altText="Figma Logo Image Missing"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-base lg:text-2xl font-semibold font-openSans leading-[135%]">
          {text}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCard;
