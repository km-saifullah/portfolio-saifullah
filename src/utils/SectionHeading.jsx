import React from "react";

const SectionHeading = ({ title }) => {
  return (
    <h3 className="text-2xl lg:text-[35px] text-heading font-bold font-roboto leading-[140%] capitalize">
      <span className="text-primary">#</span> {title}
    </h3>
  );
};

export default SectionHeading;
