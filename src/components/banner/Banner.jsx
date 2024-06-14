import React from "react";
import Image from "../../utils/Image";
import kmsSvg from "../../assets/kms.svg";
import "./banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="bg-bannerBg relative pt-[50px] sm:pt-[20px] w-[100%]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="lg:flex gap-x-[50px] items-center flex-wrap lg:flex-nowrap">
          <div>
            <h2 className="text-heading text-lg sm:text-[50px] font-bold font-openSans leading-[90%] sm:leading-[140%] flex items-center justify-center sm:justify-normal">
              Hello World <span className="hi_animation">👋</span>
            </h2>
            <h1 className="py-[5px] w-[100%] md:w-[600px] text-heading text-lg sm:text-[30px] font-bold font-openSans leading-[140%] text-center sm:text-left">
              I'm Khaled Md Saifullah a
              <span className="text-primary"> MERN-Stack Developer</span>
            </h1>
            <p className="w-[100%] md:w-[616px] pt-[10px] sm:pt-[20px] pb-[32px] font-openSans font-normal text-base leading-[140%] text-textColor text-center sm:text-left">
              Experienced MERN stack developer dedicated to creating captivating
              web experiences proficient in MongoDB, Express.js, React.js and
              Node.js technologies.
            </p>
            <div className="flex gap-x-5 items-center justify-center sm:justify-normal sm:items-start">
              <Link to="/contact">
                <button className="px-4 sm:px-5 py-2 sm:py-3 bg-primary text-[#EEF5FF] uppercase text-base sm:text-xl leading-[135%] font-openSans font-bold border border-solid border-primary transition-all ease-linear duration-300 hover:text-buttonColor hover:bg-[#EEF5FF]">
                  Contact Me
                </button>
              </Link>
              <button className="px-4 sm:px-5 py-2 sm:py-3 bg-white text-buttonColor uppercase text-base sm:text-xl leading-[135%] font-openSans font-bold border border-solid border-primary transition-all ease-linear duration-300 hover:text-[#EEF5FF] hover:bg-primary">
                Download CV{" "}
              </button>
            </div>
          </div>
          <div className="w-[95%] sm:w-[460px] h-[460px] sm:h-[560px] md:h-[580px] lg:h-[600px] overflow-hidden mx-auto lg:mx-0">
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
