import React from "react";
import Image from "../../utils/Image";
import Button from "../../utils/Button";
import projects from "../../data/projects.json";
import SectionHeading from "../../utils/SectionHeading";

const Projects = () => {
  return (
    <section className="py-20">
      <div className="max-w-container mx-auto">
        <div className="py-5">
          <SectionHeading title="Front-end" />
        </div>
        <div className="flex flex-col gap-12">
          {projects.map((item) => (
            <div
              className="flex itmes-center justify-between gap-3 shadow-md rounded-lg"
              key={item.id}
            >
              <div className="w-[50%] h-[268px] xl:w-[550px] bg-red-300 rounded-l-lg overflow-hidden ">
                <Image
                  imgSrc={item.projectImage}
                  altText="Project Image Missing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[50%]">
                <h3 className="text-primary text-[24px] font-bold font-roboto pb-3">
                  {item.projectName}
                </h3>
                <p className="text-base text-textColor font-normal font-openSans leading-[140%]">
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
                <div className="flex items-center gap-4 py-4">
                  <a href={item.projectLink} target="_blank">
                    <Button title="Github Link" className="" />
                  </a>
                  <a href={item.projectDemo} target="_blank">
                    <Button title="Live Link" className="" />
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
