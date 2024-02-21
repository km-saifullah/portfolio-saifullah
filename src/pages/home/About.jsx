import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Button from "../../utils/Button";
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
    <section className="py-[120px] relative">
      <div className="max-w-container mx-auto">
        <div className="flex items-center gap-x-[150px]">
          <div>
            <SectionHeading title="About Me" />
            <p className="w-[585px] pt-5 pb-6 text-base text-textColor font-normal font-openSans leading-[135%]">
              I'm a MERN stack developer who loves JavaScript and is fascinated
              by technology. When I'm not coding, I'm either traveling, watching
              TV series or experimenting with new technology. Let's connect and
              go exploring together.
            </p>
            <div className="flex items-center gap-x-[25px] transition-all ease-linear transition-opacity-1">
              <Button title="Contact Me" />
              <button onClick={handleWhatsApp} title="Click for QR Code">
                <FaWhatsapp className="text-whatsApp h-[40px] w-[40px]" />
              </button>
              {showQr ? <QrModal handleCloseModal={handleCloseModal} /> : null}
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <SectionHeading title="my skills" />
            <div className="w-[350px] flex flex-wrap items-center gap-5">
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
