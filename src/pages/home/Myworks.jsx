import React from "react";
import projects from "../../data/projects.json";
import WorkCard from "../../components/WorkCard";

const Myworks = () => {
  return (
    <section className="mb-[20px] lg:mb-[120px] bg-heading py-5">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div>
          <h3 className="text-2xl lg:text-[35px] text-white font-bold font-roboto leading-[140%] capitalize mb-4">
            <span className="text-primary">#</span> My Works
          </h3>
        </div>
        <div>
          <div className="flex items-center justify-center flex-col gap-10">
            {projects.map((project) => (
              <WorkCard
                key={project.id}
                id={project.id}
                projectName={project.projectName}
                projectDetail={project.projectDetail}
                projectIcons={project.projectIcons}
                projectImage={project.projectImage}
                projectLink={project.projectLink}
                projectDemo={project.projectDemo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Myworks;
