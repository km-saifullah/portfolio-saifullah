import React from "react";
import { FaGithub } from "react-icons/fa";
import { CgMediaLive } from "react-icons/cg";
import Image from "../utils/Image";

const WorkCard = ({
  id,
  projectName,
  projectDetail,
  projectIcons,
  projectImage,
  projectLink,
  projectDemo,
}) => {
  return (
    <section>
      <div className="space-y-4 flex items-center gap-x-12 gap-y-6 flex-wrap lg:flex-nowrap">
        <div
          className={`w-full h-[240px] rounded-lg overflow-hidden xl:w-[550px] ${
            id % 2 == 0 && "order-2"
          } hover:drop-shadow-imgShadow`}
        >
          <Image
            imgSrc={projectImage}
            altText="project image missing"
            className="f-full w-full object-cover rounded-lg"
          />
        </div>
        <div className={`space-y-4 ${id % 2 == 0 && "order-1"}`}>
          <h3 className="text-primary text-xl lg:text-[25px] font-semibold lg:font-bold font-roboto leading-[135%]">
            {projectName}
          </h3>
          <p className="w-full xl:w-[640px] text-base text-white font-normal font-openSans leading-[135%]">
            {projectDetail}
          </p>
          <div className="flex items-center gap-x-4">
            {projectIcons.map((item, index) => (
              <div className="h-10 w-10 overflow-hidden" key={index}>
                <Image
                  imgSrc={item.techName}
                  altText="technology name"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-x-3 pt-2">
            <a
              href={projectLink}
              className="flex items-center gap-x-2 bg-primary px-4 py-2 text-white text-base lg:text-xl font-roboto font-medium leading-[120%] capitalize"
              target="_blank"
            >
              <FaGithub />
              Gihtub Link
            </a>
            <a
              href={projectDemo}
              className="flex items-center gap-x-2 bg-primary px-4 py-2 text-white text-base lg:text-xl font-roboto font-medium leading-[120%] capitalize"
              target="_blank"
            >
              <CgMediaLive /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkCard;
