import React from "react";
import Image from "../../utils/Image";
import projects from "../../data/projects.json";
import SectionHeading from "../../utils/SectionHeading";
import { FaGithub } from "react-icons/fa";
import { CgMediaLive } from "react-icons/cg";
import { FaYoutube } from "react-icons/fa6";

const Projects = () => {
  const frontEnd = projects.slice(0, 6);
  // const bakendEnd = projects.slice(0, 6);
  // const mobile = projects.slice(0, 6);
  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="max-w-container mx-auto">
        <div className="py-2 lg:py-5">
          <SectionHeading title="Front-end" />
        </div>
        <div className="flex flex-col gap-12 px-3">
          {frontEnd.map((item) => (
            <div
              className="flex itmes-center justify-between flex-wrap lg:flex-nowrap gap-3 shadow-none lg:shadow-md rounded-lg px-2 lg:px-0"
              key={item.id}
            >
              <div className="w-full lg:w-[50%] h-[150px] lg:h-[268px] bg-red-300 lg:rounded-l-lg overflow-hidden ">
                <Image
                  imgSrc={item.projectImage}
                  altText="Project Image Missing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <h3 className="text-primary text-base lg:text-[24px] font-bold font-roboto pb-3">
                  {item.projectName}
                </h3>
                <p className="text-sm lg:text-base text-textColor font-normal font-openSans leading-[140%]">
                  {item.projectDetail}
                </p>
                <div className="flex items-center gap-x-4 pt-2">
                  {item.projectIcons.map((item, index) => (
                    <div className="h-10 w-10 overflow-hidden" key={index}>
                      <Image
                        imgSrc={item.techName}
                        altText="technology name"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 py-4">
                  <a
                    href={item.projectLink}
                    target="_blank"
                    className="flex items-center justify-center gap-x-2 bg-primary px-2 lg:px-4 py-1 lg:py-2 text-white text-[14px] lg:text-lg font-roboto font-normal md:font-medium leading-[120%] capitalize"
                  >
                    <FaGithub />
                    Github Link
                  </a>
                  <a
                    href={item.projectDemo}
                    target="_blank"
                    className="flex items-center justify-center gap-x-2 bg-primary px-2 lg:px-4 py-1 lg:py-2 text-white text-[14px] lg:text-lg font-roboto font-normal md:font-medium leading-[120%] capitalize"
                  >
                    <CgMediaLive />
                    Live Site
                  </a>
                  <a
                    href={item.projectDemo}
                    target="_blank"
                    className="hidden md:flex items-center justify-center gap-x-2 bg-primary px-2 lg:px-4 py-1 lg:py-2 text-white text-[14px] lg:text-lg font-roboto font-normal md:font-medium leading-[120%] capitalize"
                  >
                    <FaYoutube />
                    Demo Video
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
