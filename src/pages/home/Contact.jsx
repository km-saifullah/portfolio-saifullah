import React, { useState } from "react";
import Image from "../../utils/Image";
import contactMe from "../../assets/contact_img.png";
import SectionHeading from "../../utils/SectionHeading";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  //   handle input fields
  const handleInputFields = (e) => {
    let messageInfo = { ...formData };
    messageInfo[e.target.name] = e.target.value;
    setFormData(messageInfo);
  };

  //   handle message
  const handleMessage = (e) => {
    console.log(formData);
    setFormData({
      fullName: "",
      email: "",
      message: "",
    });
    e.preventDefault();
  };
  return (
    <section className="">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="pb-8">
          <SectionHeading title="Contact Me" />
        </div>
        <div className="flex items-center gap-x-[100px]">
          <div className="h-[475px] w-[500px] overflow-hidden">
            <figure>
              <Image
                className="h-full w-full object-cover"
                imgSrc={contactMe}
                altText="Contact Vector Image"
              />
            </figure>
          </div>
          <div className="bg-contactBg py-16 px-10 rounded-lg">
            <form>
              <div className="flex items-start justify-start flex-col gap-y-3 pb-3">
                <label
                  htmlFor="fullName"
                  className="text-white text-xl font-semibold font-roboto leading-[140%]"
                >
                  Full Name
                </label>
                <input
                  className="w-[560px] bg-inputFieldBg py-4 px-3 outline-none border-none text-white text-base font-normal font-openSans leading-[140%]"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Enter Your Name"
                  onChange={handleInputFields}
                />
              </div>
              <div className="flex items-start justify-start flex-col gap-y-3 pb-3">
                <label
                  htmlFor="email"
                  className="text-white text-xl font-semibold font-roboto leading-[140%]"
                >
                  Email
                </label>
                <input
                  className="w-[560px] bg-inputFieldBg py-4 px-3 outline-none border-none text-white text-base font-normal font-openSans leading-[140%]"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter Your Email"
                  onChange={handleInputFields}
                />
              </div>
              <div className="flex items-start justify-start flex-col gap-y-3 pb-3">
                <label
                  htmlFor="message"
                  className="text-white text-xl font-semibold font-roboto leading-[140%]"
                >
                  Message
                </label>
                <textarea
                  className="w-[560px] h-[200px] bg-inputFieldBg py-4 px-3 outline-none border-none text-white text-base font-normal font-openSans leading-[140%]"
                  name="message"
                  type="text"
                  value={formData.message}
                  placeholder="Enter Your Message"
                  onChange={handleInputFields}
                ></textarea>
              </div>
              <div className="flex items-start justify-start flex-col gap-y-3">
                <button
                  onClick={handleMessage}
                  className="bg-inputFieldBg px-5 py-2 text-white text-[18px] font-bold font-roboto leading-[135%] capitalize hover:text-heading hover:bg-buttonText transition-all ease-linear duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
