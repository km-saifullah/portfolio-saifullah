import React from "react";
import Image from "../../utils/Image";
import kmsSvg from "../../assets/kms.svg";
import "./banner.css";

const Banner = () => {
  return (
    <section className="bg-bannerBg relative pt-[100px] w-[100%]">
      <div className="max-w-container mx-auto">
        <div className="flex gap-x-[50px] items-center">
          <div>
            <h2 className="text-heading text-[64px] font-bold font-openSans leading-[140%] flex items-center">
              Hello World <span className="hi_animation">👋</span>
            </h2>
            <h1 className="py-[5px] w-[600px] text-heading text-[48px] font-bold font-openSans leading-[140%]">
              I'm Khaled Md Saifullah a{" "}
              <span className="text-primary">Full-Stack Developer</span>
            </h1>
            <p className="w-[616px] pt-[20px] pb-[32px] font-openSans font-normal text-base leading-[140%] text-textColor">
              Experienced MERN stack developer dedicated to creating captivating
              web experiences proficient in MongoDB, Express.js, React.js and
              Node.js technologies.
            </p>
            <div className="flex gap-x-5">
              <button className="px-5 py-3 bg-primary text-[#EEF5FF] uppercase text-xl leading-[135%] font-openSans font-bold border border-solid border-primary transition-all ease-linear duration-300 hover:text-buttonColor hover:bg-[#EEF5FF]">
                Contact Me
              </button>
              <button className="px-5 py-3 bg-white text-buttonColor uppercase text-xl leading-[135%] font-openSans font-bold border border-solid border-primary transition-all ease-linear duration-300 hover:text-[#EEF5FF] hover:bg-primary">
                Download CV{" "}
              </button>
            </div>
          </div>
          <div className="w-[460px] h-[600px] overflow-hidden">
            <figure>
              <Image
                className="h-full w-full object-cover"
                imgSrc={kmsSvg}
                altText="Khaled Md Saifullah Photo"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
