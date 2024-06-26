import React, { useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "../../utils/Image";
import contactImg from "../../assets/contact_img.png";
import { push, ref, set } from "firebase/database";
import { db } from "../../db/firebase.config";

const Contact = () => {
  const [inputValues, setInputValues] = useState({
    fullname: "",
    email: "",
    message: "",
  });
  // handle input fields
  const handleInput = (e) => {
    const inputInfo = { ...inputValues };
    inputInfo[e.target.name] = e.target.value;
    setInputValues(inputInfo);
  };

  // send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (
      inputValues.fullname === "" &&
      inputValues.email === "" &&
      inputValues.message === ""
    ) {
      alert("Please enter all fields");
    } else {
      set(push(ref(db, "messages/")), {
        fullName: inputValues.fullname,
        email: inputValues.email,
        message: inputValues.message,
      });
    }
    setInputValues({
      fullname: "",
      email: "",
      message: "",
    });
  };
  return (
    <main className="py-14 md:py-[90px] lg:py-[100px] lg:pt-[120px]">
      <div className="max-w-container mx-auto">
        <section className="flex items-center justify-center gap-4 flex-wrap lg:flex-nowrap">
          <section className="w-full md:w-[500px] lg:w-[635px] p-5 lg:p-10 bg-navLink rounded-lg space-y-5 lg:space-y-8">
            <div>
              <h2 className="text-lg lg:text-[22px] text-white font-roboto font-bold leading-[140%] capitalize">
                <span className="text-primary">#</span> contact with me
              </h2>
            </div>
            <div className="h-[400] lg:h-[475px] w-full lg:w-[500px]">
              <Image
                imgSrc={contactImg}
                altText="Conatct Image Missing"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-5 lg:space-y-8">
              <div>
                <h2 className="text-lg lg:text-[22px] text-white font-roboto font-bold leading-[140%] capitalize">
                  <span className="text-primary">#</span> social media
                </h2>
              </div>
              <div className="flex gap-x-4">
                <div className="h-[25px] lg:h-[40px] w-[25px] lg:w-[40px] bg-white flex items-center justify-center hover:bg-primary hover:text-white">
                  <a
                    href="https://facebook.com/saifullah.monmoy"
                    target="_blank"
                    className="text-base lg:text-xl"
                  >
                    <FaFacebookF />
                  </a>
                </div>
                <div className="h-[25px] lg:h-[40px] w-[25px] lg:w-[40px] bg-white flex items-center justify-center hover:bg-primary hover:text-white">
                  <a
                    href="https://github.com/km-saifullah"
                    target="_blank"
                    className="text-base lg:text-xl"
                  >
                    <FaGithub />
                  </a>
                </div>
                <div className="h-[25px] lg:h-[40px] w-[25px] lg:w-[40px] bg-white flex items-center justify-center hover:bg-primary hover:text-white">
                  <a
                    href="https://www.linkedin.com/in/kmsaifullah"
                    target="_blank"
                    className="text-base lg:text-xl"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full md:w-[500px] lg:w-[635px] p-5 lg:p-10 bg-primary rounded-lg space-y-5 lg:space-y-8">
            <div>
              <h2 className="text-lg lg:text-[22px] text-white font-roboto font-bold leading-[140%] capitalize">
                <span className="text-navLink">#</span> let's talk
              </h2>
            </div>
            <div>
              <form className="flex items-start justify-start gap-5 flex-col">
                <div className="w-full">
                  <input
                    className="bg-inputFieldBg w-full py-7 px-5 border-none outline-none text-buttonText text-base lg:text-lg font-normal font-openSans leading-[135%]"
                    type="text"
                    name="fullname"
                    value={inputValues.fullname}
                    onChange={handleInput}
                    placeholder="Enter Your Fullname"
                  />
                </div>
                <div className="w-full">
                  <input
                    className="bg-inputFieldBg w-full py-7 px-5 border-none outline-none text-buttonText text-base lg:textlg font-normal font-openSans leading-[135%]"
                    type="email"
                    name="email"
                    value={inputValues.email}
                    onChange={handleInput}
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="w-full">
                  <textarea
                    cols="30"
                    rows="9"
                    className="bg-inputFieldBg w-full py-7 px-5 border-none outline-none text-buttonText text-base lg:text-lg font-normal font-openSans leading-[135%]"
                    type="text"
                    name="message"
                    value={inputValues.message}
                    onChange={handleInput}
                    placeholder="Enter Your Message"
                  ></textarea>
                </div>
                <div className="w-full">
                  <button
                    className="w-full py-7 px-5 text-buttonText text-lg lg:text-lg font-semibold font-openSans leading-[135%] bg-inputFieldBg hover:bg-navLink border-none outline-none"
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Contact;
