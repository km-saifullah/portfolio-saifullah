import React from "react";
import Image from "../../utils/Image";
import Button from "../../utils/Button";
import projects from "../../data/projects.json";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <section className="py-20">
      <div className="max-w-container mx-auto">
        <h2>Front-End Project</h2>
        <div className="py-3 flex items-center justify-between flex-col gap-12">
          {projects.map((item, index) => (
            <div
              className="flex itmes-center justify-between gap-3 shadow-lg rounded-lg pt-6"
              key={item.id}
            >
              <div className="w-[50%] h-[260px] xl:w-[550px] bg-red-300 rounded-l-lg overflow-hidden ">
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
                <div className="flex items-center gap-4 py-4">
                  <Link to={item.projectLink} target="__blank">
                    <Button title="Github Link" className="" />
                  </Link>
                  <Link to={item.projectDemo} target="__blank">
                    <Button title="Live Link" className="" />
                  </Link>
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
