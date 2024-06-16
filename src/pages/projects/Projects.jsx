import React from "react";
import projects from "../../data/projects.json";
import SectionHeading from "../../utils/SectionHeading";
import ProjectCard from "../../components/ProjectCard";

const Projects = () => {
  const frontEnd = projects.slice(0, 6);
  // const bakendEnd = projects.slice(0, 6);
  const mobile = projects.slice(6, 7);
  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="max-w-container mx-auto">
        <div>
          <div className="py-2 lg:py-5">
            <SectionHeading title="Frontend Projects" />
          </div>
          <div className="flex flex-col gap-12 px-3">
            {frontEnd.map((item) => (
              <ProjectCard
                keyId={item.id}
                projectImg={item.projectImage}
                projectTitle={item.projectName}
                projectDescription={item.projectDetail}
                icons={item.projectIcons}
                projectGithub={item.projectLink}
                liveSite={item.projectDemo}
                youtubeLink={item.demoVideo}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="py-2 lg:py-5">
            <SectionHeading title="Mobile Development" />
          </div>
          <div className="flex flex-col gap-12 px-3">
            {mobile.map((item) => (
              <ProjectCard
                keyId={item.id}
                projectImg={item.projectImage}
                projectTitle={item.projectName}
                projectDescription={item.projectDetail}
                icons={item.projectIcons}
                projectGithub={item.projectLink}
                liveSite={item.projectDemo}
                youtubeLink={item.demoVideo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
