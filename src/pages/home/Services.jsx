import React from "react";
import SectionHeading from "../../utils/SectionHeading";
import Image from "../../utils/Image";
import figma from "../../assets/figma.png";
import webDesign from "../../assets/web_design.png";
import webDev from "../../assets/web_dev.png";
import appDev from "../../assets/app_dev.png";

const Services = () => {
  return (
    <section className="py-[64px] bg-serviceBg">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <SectionHeading title="Services" />
        <div className="pt-[34px] flex items-center gap-x-[100px] flex-wrap gap-y-7">
          <div className="flex items-center w-full xl:w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-white">
              <figure>
                <Image imgSrc={figma} altText="Figma Image" />
              </figure>
            </div>
            <div className="">
              <h3 className="pl-4 sm:pl-[38px] text-white text-base sm:text-[28px] font-bold font-openSans leading-[140%]">
                Figma Design
              </h3>
            </div>
          </div>
          <div className="flex items-center w-full xl:w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-white">
              <figure>
                <Image imgSrc={webDesign} altText="Web Design Image" />
              </figure>
            </div>
            <div className="">
              <h3 className="pl-[38px] text-white text-base sm:text-[28px] font-bold font-openSans leading-[140%]">
                Website Design
              </h3>
            </div>
          </div>
          <div className="flex items-center w-full xl:w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-white">
              <figure>
                <Image imgSrc={webDev} altText="Web Development Image" />
              </figure>
            </div>
            <div className="">
              <h3 className="pl-[38px] text-white text-base sm:text-[28px] font-bold font-openSans leading-[140%]">
                Web Development
              </h3>
            </div>
          </div>
          <div className="flex items-center w-full xl:w-[490px] h-[168px] bg-heading">
            <div className="h-[100%] w-[168px] bg-white">
              <figure>
                <Image
                  imgSrc={appDev}
                  altText="Mobile Application Development Image"
                />
              </figure>
            </div>
            <div className="">
              <h3 className="pl-[38px] text-white text-base sm:text-[28px] font-bold font-openSans leading-[140%]">
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
