import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import QrModal from "../../utils/QrModal";
import SectionHeading from "../../utils/SectionHeading";
import { icons } from "../../data/image";
import Image from "../../utils/Image";

const About = () => {
  const [showQr, setShowQr] = useState(false);
  // handle whatsapp button
  const handleWhatsApp = () => {
    setShowQr(true);
  };

  //   handle close modal
  const handleCloseModal = () => {
    setShowQr(false);
  };
  return (
    <section className="py-[50px] md:py-[120px] relative">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="flex items-center gap-x-[150px] flex-wrap lg:flex-nowrap gap-y-[20px] sm:gap-p-0">
          <div>
            <SectionHeading title="About Me" />
            <p className="w-full xl:w-[585px] text-justify md:text-left pt-5 pb-6 text-base text-textColor font-normal font-openSans leading-[135%]">
              I'm a MERN stack developer who loves JavaScript and is fascinated
              by technology. When I'm not coding, I'm either traveling, watching
              TV series or experimenting with new technology. Let's connect and
              go exploring together.
            </p>
            <div className="flex items-center gap-x-[25px] transition-all ease-linear transition-opacity-1">
              <a href="mailto:kmsaifullah16@gmail.com">
                <button title="kmsaifullah16@gmail.com">
                  <BiLogoGmail className="text-[#ff5d5d] hover:text-[#ff4343] transition-all ease-linear duration-300 h-[40px] w-[40px]" />
                </button>
              </a>
              <button onClick={handleWhatsApp} title="Click for QR Code">
                <FaWhatsapp className="text-whatsApp hover:text-primary transition-all ease-linear duration-300 h-[40px] w-[40px]" />
              </button>
              {showQr ? <QrModal handleCloseModal={handleCloseModal} /> : null}
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <SectionHeading title="my skills" />
            <div className="w-full xl:w-[350px] flex flex-wrap items-center gap-5">
              {icons.map((icon) => (
                <div
                  key={icon.id}
                  className="w-[40px] h-[40px] overflow-hidden flex items-center justify-center"
                >
                  <Image
                    imgSrc={icon.icon}
                    altText={icon.iconName}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
