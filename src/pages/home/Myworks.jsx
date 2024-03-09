import React from "react";
import Image from "../../utils/Image";
import SectionHeading from "../../utils/SectionHeading";
import chatImg from "../../assets/chat_img.png";
import Button from "../../utils/Button";

let technology = [
  {
    techName:
      "https://raw.githubusercontent.com/km-saifullah/image-data/main/icons/tailwind-css.svg",
  },
  {
    techName:
      "https://raw.githubusercontent.com/km-saifullah/image-data/main/icons/react.svg",
  },
  {
    techName:
      "https://raw.githubusercontent.com/km-saifullah/image-data/main/icons/firebase.svg",
  },
];
console.log(technology.length);

const Myworks = () => {
  return (
    <section className="bg-heading mb-[120px]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <h3 className="text-[35px] text-white font-bold font-roboto leading-[140%] capitalize pb-8">
          <span className="text-primary">#</span> My Works
        </h3>
        <div className="flex gap-12 flex-wrap">
          <div className="flex gap-x-[64px]">
            <div className="w-[550px] h-[300px] overflow-hidden hover:drop-shadow-imgShadow">
              <Image imgSrc={chatImg} altText="project image" />
            </div>
            <div className="space-y-4">
              <h3 className="text-primary font-bold font-roboto leading-[140%] text-[25px]">
                dailyChat
              </h3>
              <p className="w-[640px] text-white font-normal font-openSans text-base leading-[135%]">
                Introducing a dynamic chat application built with ReactJS and
                Firebase. This feature-rich platform enables seamless
                communication through real-time updates and user authentication.
                Using Firebase as a database ensures reliability and
                scalability, allowing users to have a seamless chatting
                experience.
              </p>
              <div className="flex items-center gap-x-4">
                {technology.map((item, index) => (
                  <div className="h-10 w-10 overflow-hidden" key={index}>
                    <Image
                      imgSrc={item.techName}
                      altText="technology name"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-x-3">
                <a
                  href="https://github.com/km-saifullah/dailytalk"
                  target="_blank"
                >
                  <button className="px-5 py-2 bg-[#FF7262] text-white text-lg font-bold font-roboto leading-[140%]">
                    Project Github Link
                  </button>
                </a>
                <button className="px-5 py-2 bg-[#FF7262] text-white text-lg font-bold font-roboto leading-[140%]">
                  Project Live Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Myworks;
