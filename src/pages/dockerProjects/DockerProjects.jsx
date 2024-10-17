import React from "react";
import SectionHeading from "../../utils/SectionHeading";
import ProjectCard from "../../components/ProjectCard";
import dockerPorjects from "../../data/dockerProjects.json";

const DockerProjects = () => {
  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="max-w-container mx-auto">
        <section>
          <div className="py-2 lg:py-5">
            <SectionHeading title="Docker Projects" />
          </div>
          <div className="flex flex-col gap-12 px-3">
            {dockerPorjects.map((item) => (
              <ProjectCard
                key={item.id}
                projectImg={item.projectImage}
                projectTitle={item.projectName}
                projectDescription={item.projectDetail}
                icons={item.projectIcons}
                projectGithub={item.projectLink}
                // liveSite={item.projectDemo}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default DockerProjects;
