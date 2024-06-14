import React from "react";
import SectionHeading from "../../utils/SectionHeading";
import figma from "../../assets/figma.png";
import webDesign from "../../assets/web_design.png";
import webDev from "../../assets/web_dev.png";
import appDev from "../../assets/app_dev.png";
import ServiceCard from "../../components/ServiceCard";

const Services = () => {
  return (
    <section className="py-[20px] lg:py-[30px] bg-serviceBg">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="pb-[35px]">
          <SectionHeading title="Services" className="" />
        </div>
        <div className="flex items-center justify-around text-white flex-wrap gap-9">
          <ServiceCard img={figma} text="Figma Design" />
          <ServiceCard img={webDesign} text="Website Design" />
          <ServiceCard img={webDev} text="Web Development" />
          <ServiceCard img={appDev} text="App Development" />
        </div>
      </div>
    </section>
  );
};

export default Services;
