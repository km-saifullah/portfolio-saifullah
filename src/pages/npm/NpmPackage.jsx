import React from "react";
import SectionHeading from "../../utils/SectionHeading";
import Package from "../../utils/Package";

const NpmPackage = () => {
  return (
    <section className="py-[20px] lg:py-[30px]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="py-2 lg:py-5">
          <SectionHeading title="NPM Package" />
        </div>
        <Package
          packageName="quick-app"
          packageDetails="Starter files and directories for an express application. Using this
          package you can create a new express app with all necessary files and directories."
          packageLink="https://www.npmjs.com/package/quick-app"
        />
        <Package
          packageName="quick-response"
          packageDetails="API response message for any Node JS application"
          packageLink="https://www.npmjs.com/package/quick-response"
        />
      </div>
    </section>
  );
};

export default NpmPackage;
