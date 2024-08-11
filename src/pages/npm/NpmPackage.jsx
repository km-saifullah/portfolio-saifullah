import React from "react";
import SectionHeading from "../../utils/SectionHeading";
import packageImg from "../../assets/images/package.png";
import { Link } from "react-router-dom";

const NpmPackage = () => {
  return (
    <section className="py-[20px] lg:py-[30px]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="py-2 lg:py-5">
          <SectionHeading title="NPM Package" />
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap-reverse">
          <div className="w-[500px]">
            <h1 className="text-xl font-roboto font-bold">quick-app</h1>
            <p className="w-full xl:w-[585px] text-justify md:text-left pt-2 pb-2 text-base text-textColor font-normal font-openSans leading-[135%]">
              Starter files and directories for an express application. Using
              this package you can create a new express app with all necessary
              files and directories.
            </p>
            <img src="https://img.shields.io/npm/dw/quick-app" alt="" />
            <div className="pt-2">
              <Link
                className="text-primary decoration-solid underline"
                to="https://www.npmjs.com/package/quick-app"
                target="_blank"
              >
                Package Link
              </Link>
            </div>
          </div>
          <div className="w-[200px] h-[200px]">
            <img
              className="h-fll w-full object-cover"
              src={packageImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NpmPackage;
