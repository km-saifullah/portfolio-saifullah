import React from "react";
import SectionHeading from "../../utils/SectionHeading";

const Services = () => {
  return (
    <section className="py-[64px] bg-serviceBg">
      <div className="max-w-container mx-auto">
        <SectionHeading title="Services" />
        <div className="pt-[34px] flex items-center gap-x-[100px] flex-wrap gap-y-7">
          <div className="flex items-center w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-red-400"></div>
            <div className="">
              <h3 className="pl-[38px] text-white text-[28px] font-bold font-openSans leading-[140%]">
                Figma Design
              </h3>
            </div>
          </div>
          <div className="flex items-center w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-red-400"></div>
            <div className="">
              <h3 className="pl-[38px] text-white text-[28px] font-bold font-openSans leading-[140%]">
                Website Design
              </h3>
            </div>
          </div>
          <div className="flex items-center w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-red-400"></div>
            <div className="">
              <h3 className="pl-[38px] text-white text-[28px] font-bold font-openSans leading-[140%]">
                Web Development
              </h3>
            </div>
          </div>
          <div className="flex items-center w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-red-400"></div>
            <div className="">
              <h3 className="pl-[38px] text-white text-[28px] font-bold font-openSans leading-[140%]">
                App Development
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
