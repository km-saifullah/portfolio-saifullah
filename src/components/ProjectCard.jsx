import React from "react";
import Image from "../utils/Image";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { CgMediaLive } from "react-icons/cg";

const ProjectCard = ({
  keyId,
  projectImg,
  projectTitle,
  projectDescription,
  icons,
  projectGithub,
  liveSite,
  youtubeLink,
}) => {
  return (
    <div
      className="flex itmes-center justify-between flex-wrap lg:flex-nowrap gap-3 shadow-none lg:shadow-md rounded-lg px-2 lg:px-0"
      keyId={keyId}
    >
      <div className="w-full lg:w-[50%] h-[150px] lg:h-[268px] lg:rounded-l-lg overflow-hidden ">
        <Image
          imgSrc={projectImg}
          altText={`${projectTitle} image missing`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-[50%]">
        <h3 className="text-primary text-base lg:text-[24px] font-bold font-roboto pb-3">
          {projectTitle}
        </h3>
        <p className="text-sm lg:text-base text-textColor font-normal font-openSans leading-[140%]">
          {projectDescription}
        </p>
        <div className="flex items-center gap-x-4 pt-2">
          {icons.map((item, index) => (
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
            href={projectGithub}
            target="_blank"
            className="flex items-center justify-center gap-x-2 bg-primary px-2 lg:px-4 py-1 lg:py-2 text-white text-[14px] lg:text-lg font-roboto font-normal md:font-medium leading-[120%] capitalize"
          >
            <FaGithub />
            Github Link
          </a>
          <a
            href={liveSite}
            target="_blank"
            className="flex items-center justify-center gap-x-2 bg-primary px-2 lg:px-4 py-1 lg:py-2 text-white text-[14px] lg:text-lg font-roboto font-normal md:font-medium leading-[120%] capitalize"
          >
            <CgMediaLive />
            Live Site
          </a>
          <a
            href={youtubeLink}
            target="_blank"
            className="hidden md:flex items-center justify-center gap-x-2 bg-primary px-2 lg:px-4 py-1 lg:py-2 text-white text-[14px] lg:text-lg font-roboto font-normal md:font-medium leading-[120%] capitalize"
          >
            <FaYoutube />
            Demo Video
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
