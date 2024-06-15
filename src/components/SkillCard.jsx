import React from "react";
import Image from "../utils/Image";

const SkillCard = ({ keyId, icon, iconName }) => {
  return (
    <div className="flex items-center flex-col flex-wrap gap-2" key={keyId}>
      <div className="h-[35px] w-[35px]">
        <Image imgSrc={icon} className="h-full w-full object-cover" />
      </div>
      <h6 className="text-textColor text-sm font-openSans font-normal capitalize">
        {iconName}
      </h6>
    </div>
  );
};

export default SkillCard;
