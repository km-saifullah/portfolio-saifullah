import React from "react";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import Image from "../../utils/Image";
import contactImg from "../../assets/contact_img.png";
import Input from "../../utils/Input";

const Contact = () => {
  // handle input fields
  const handleInput = (e) => {};
  // send message
  const handleSendMessage = (e) => {
    e.preventDefault();
  };
  return (
    <main className="py-[130px]">
      <div className="max-w-container mx-auto">
        <section className="flex gap-x-5">
          <div className="bg-navLink p-10 space-y-8 rounded-lg">
            <h2 className="text-white text-[35px] font-bold font-roboto leading-[140%] capitalize">
              <span className="text-primary">#</span> Contact With Me
            </h2>
            <div className="w-[500px] h-[475px]">
              <Image
                imgSrc={contactImg}
                altText="Contact Image Not Found"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-white text-[35px] font-bold font-roboto leading-[140%] capitalize">
              <span className="text-primary">#</span> social media
            </h2>
            <div className="flex gap-x-3">
              <a
                href="https://www.facebook.com/saifullah.monmoy"
                className="text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[40px] h-[40px] flex items-center justify-center hover:bg-primary">
                  <FaFacebookF />
                </div>
              </a>
              <a
                href="https://github.com/km-saifullah"
                className="text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[40px] h-[40px] flex items-center justify-center hover:bg-primary">
                  <FaGithub />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/kmsaifullah"
                className="text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[40px] h-[40px] flex items-center justify-center hover:bg-primary">
                  <FaLinkedin />
                </div>
              </a>
              <a
                href="https://twitter.com/SaifullahMonmoy"
                className="text-xl"
                target="_blank"
              >
                <div className="bg-buttonText text-heading hover:text-buttonText w-[40px] h-[40px] flex items-center justify-center hover:bg-primary">
                  <RiTwitterXFill />
                </div>
              </a>
            </div>
          </div>
          <div className="bg-primary p-10 space-y-8 rounded-lg">
            <h2 className="text-white text-[35px] font-bold font-roboto leading-[140%] capitalize">
              <span className="text-navLink">#</span> send your message
            </h2>
            <form>
              <div className="space-y-7">
                <div>
                  <Input
                    className="bg-inputFieldBg w-[525px] py-7 px-4 text-white text-base font-normal font-openSans leading-[140%] outline-none border-none"
                    type="text"
                    name=""
                    // value=""
                    onChange={handleInput}
                    placeholder="Enter Your Fullname"
                  />
                </div>
                <div>
                  <Input
                    className="bg-inputFieldBg w-[525px] py-7 px-4 text-white text-base font-normal font-openSans leading-[140%] outline-none border-none"
                    type="email"
                    name=""
                    // value=""
                    onChange={handleInput}
                    placeholder="Enter Your Email"
                  />
                </div>
                <div>
                  <textarea
                    rows="10"
                    className="bg-inputFieldBg w-[525px] py-7 px-4 text-white text-base font-normal font-openSans leading-[140%] outline-none border-none"
                    type="text"
                    name="message"
                    // value=""
                    onChange={handleInput}
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div>
                  <button
                    className="bg-inputFieldBg w-[525px] py-7 px-4 text-white text-xl uppercase font-bold font-openSans leading-[140%] outline-none border-none"
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
