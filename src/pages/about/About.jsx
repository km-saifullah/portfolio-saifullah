import React from "react";
import SectionHeading from "../../utils/SectionHeading";
import { icons } from "../../data/image";
import SkillCard from "../../components/SkillCard";
import { Link } from "react-router-dom";
import { FaDev } from "react-icons/fa";
import { FaMediumM } from "react-icons/fa";

const About = () => {
  const frontEnd = icons.slice(0, 9);
  const backEnd = icons.slice(9, 13);
  const others = icons.slice(13, 18);
  return (
    <section className="py-10 md:py-20">
      <div className="max-w-container mx-auto">
        {/* ========== About Me Start =========== */}
        <div className="pb-5 px-1">
          <SectionHeading title="About Me" />
          <div className="px-4 pt-3">
            <h3 className="text-heading text-xl font-bold font-roboto">
              Khaled Md Saifullah
            </h3>
            <h5 className="text-textColor text-base font-normal font-openSans py-1">
              MERN Stack Developer
            </h5>
            <p className="text-textColor leading-[140%] text-base font-normal font-openSans">
              I'm a MERN stack developer who loves JavaScript and is fascinated
              by technology. When I'm not coding, I'm either traveling, watching
              TV series or experimenting with new technology. Let's connect and
              go exploring together.
            </p>
            <div className="flex items-center gap-x-3 py-3">
              <p className="text-navLink text-base font-medium font-openSans">
                I regularly write articles on |
              </p>
              <div className="flex items-center justify-center gap-x-5">
                <div
                  className="h-[20px] w-[20px] flex items-center justify-center"
                  title="Dev"
                >
                  <Link to="https://dev.to/kmsaifullah" target="_blank">
                    <FaDev className="h-[30px] w-[30px]" />
                  </Link>
                </div>
                <div
                  className="h-[20px] w-[20px] flex items-center justify-center"
                  title="Medium"
                >
                  <Link to="https://medium.com/@kmsaifullah16" target="_blank">
                    <FaMediumM className="h-[30px] w-[30px]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ========== About Me End =========== */}

        {/* ========== Skills Start ============= */}
        <div className="flex items-start justify-between flex-col md:flex-row flex-nowrap md:flex-wrap px-2 lg:px-4">
          {/* frontend skills */}
          <div className="w-full md:w-[30%]">
            <div className="pb-3">
              <SectionHeading title="Frontend Skills" />
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4">
              {frontEnd.map((items) => (
                <SkillCard
                  key={items.id}
                  keyId={items.id}
                  icon={items.icon}
                  iconName={items.iconName}
                />
              ))}
            </div>
          </div>

          {/* backend skills */}
          <div className="w-full md:w-[30%] pt-4 md:pt-0">
            <div className="pb-3">
              <SectionHeading title="Backend Skills" />
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4">
              {backEnd.map((items) => (
                <SkillCard
                  key={items.id}
                  keyId={items.id}
                  icon={items.icon}
                  iconName={items.iconName}
                />
              ))}
            </div>
          </div>

          {/* other skills */}
          <div className="w-full md:w-[30%] pt-4 md:pt-0">
            <div className="pb-3">
              <SectionHeading title="Other Skills" />
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4">
              {others.map((items) => (
                <SkillCard
                  key={items.id}
                  keyId={items.id}
                  icon={items.icon}
                  iconName={items.iconName}
                />
              ))}
            </div>
          </div>
        </div>
        {/* ========== Skills End ============= */}
      </div>
    </section>
  );
};

export default About;
