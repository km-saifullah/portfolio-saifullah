import React from "react";
import projects from "../../data/projects.json";
import WorkCard from "../../components/WorkCard";
import { useNavigate } from "react-router-dom";

const Myworks = () => {
  let myProjects = projects.slice(0, 2);
  const navigate = useNavigate();
  return (
    <section className="mb-[20px] lg:mb-[40px] bg-heading py-5">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div>
          <h3 className="text-2xl lg:text-[35px] text-white font-bold font-roboto leading-[140%] capitalize mb-4">
            <span className="text-primary">#</span> My Works
          </h3>
        </div>
        <div>
          <div className="flex items-center justify-center flex-col gap-10">
            {myProjects.map((project) => (
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
        <div className="flex items-center justify-center">
          <div
            className="w-[200px] h-[40px] text-center text-white font-normal font-openSans flex items-center justify-center mt-6 bg-primary"
            onClick={() => navigate("/projects")}
          >
            <button>See More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Myworks;
