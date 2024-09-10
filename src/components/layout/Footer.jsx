import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="bg-footerBg py-[50px]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className=" flex gap-x-4 flex-col">
            <h4 className="text-primary text-lg lg:text-[25px] font-bold font-roboto leading-[140%] pb-3">
              Social Links
            </h4>
            <div className="flex items-center gap-x-4">
              <a
                href="https://www.facebook.com/saifullah.monmoy"
                className="text-base lg:text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[26px] lg:w-[40px] h-[26px] lg:h-[40px] flex items-center justify-center hover:bg-primary">
                  <FaFacebookF />
                </div>
              </a>
              <a
                href="https://github.com/km-saifullah"
                className="text-base lg:text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[26px] lg:w-[40px] h-[26px] lg:h-[40px] flex items-center justify-center hover:bg-primary">
                  <FaGithub />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/kmsaifullah"
                className="text-base lg:text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[26px] lg:w-[40px] h-[26px] lg:h-[40px] flex items-center justify-center hover:bg-primary">
                  <FaLinkedin />
                </div>
              </a>
              <a
                href="https://twitter.com/SaifullahMonmoy"
                className="text-base lg:text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[26px] lg:w-[40px] h-[26px] lg:h-[40px] flex items-center justify-center hover:bg-primary">
                  <RiTwitterXFill />
                </div>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-primary text-lg lg:text-[25px] font-bold font-roboto leading-[140%] pb-3">
              Youtube Channel
            </h4>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center jusitfy-center h-[45px] w-[45px]">
                <FaYoutube className="text-4xl text-[#FF0000]" />
              </div>
              <div>
                <Link
                  className="text-buttonText text-sm lg:text-xl font-normal font-openSans leading-[135%] underline"
                  to={"https://www.youtube.com/@kmSaifullah"}
                  target="_blank"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
          <div className="">
            <h4 className="text-primary text-lg lg:text-[25px] font-bold font-roboto leading-[140%] pb-3">
              Pages
            </h4>
            <ul className="flex flex-col gap-y-3">
              <li className="text-buttonText text-sm lg:text-xl font-normal font-openSans leading-[135%]">
                <Link to="/">Home</Link>
              </li>
              <li className="text-buttonText text-sm lg:text-xl font-normal font-openSans leading-[135%]">
                <Link to="/blogs">Blogs</Link>
              </li>
              <li className="text-buttonText text-sm lg:text-xl font-normal font-openSans leading-[135%]">
                <Link to="/projects">Projects</Link>
              </li>
              <li className="text-buttonText text-sm lg:text-xl font-normal font-openSans leading-[135%]">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t-2">
        <p className="pt-[44px] text-white text-center text-base lg:text-xl font-normal font-openSans leading-[120%] capitalize">
          Copyright &copy; {date.getFullYear()} | All rights reserved by Khaled
          Md Saifullah
        </p>
      </div>
    </footer>
  );
};

export default Footer;
