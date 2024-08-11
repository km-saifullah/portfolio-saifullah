import React from "react";
import SectionHeading from "../../utils/SectionHeading";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const VideoSection = () => {
  return (
    <section className="py-[10px] lg:py-[30px]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="mb-3">
          <SectionHeading title="Youtube Videos" />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-center">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper rounded-lg flex items-center justify-center w-[100%] md:w-[70%] h-[100%] md:h-[70%] "
            >
              <SwiperSlide className="flex items-center justify-center">
                <Link to="https://youtu.be/A1AMxrSYdPM" target="_blank">
                  <img
                    src="https://i.ibb.co/Mcn1T0z/node-pi.png"
                    alt=""
                    title="Click and watch Video on YouTube"
                    className="rounded-lg"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <Link to="https://youtu.be/0qSe4aWmSgM" target="_blank">
                  <img
                    src="https://i.ibb.co/LPntft9/create-node-app.png"
                    alt=""
                    title="Click and watch Video on YouTube"
                    className="rounded-lg"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <Link to="https://youtu.be/sUwXeK5OTlc" target="_blank">
                  <img
                    src="https://i.ibb.co/9gLZcpv/own-api.png"
                    alt=""
                    title="Click and watch Video on YouTube"
                    className="rounded-lg"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <Link to="https://youtu.be/Y_q3zB4UxDA" target="_blank">
                  <img
                    src="https://i.ibb.co/VYGYmNr/google-Chrome.png"
                    alt=""
                    className="rounded-lg"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <Link to="https://youtu.be/gp__mVizdhI" target="_blank">
                  <img
                    src="https://i.ibb.co/93SPY6d/setup-react-project.png"
                    alt=""
                    className="rounded-lg"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                <Link to="https://www.youtube.com/@kmsaifullah" target="_blank">
                  <img
                    src="https://i.ibb.co/4FRDS1X/youtube-Thumbnail.gif"
                    alt=""
                    className="rounded-lg"
                  />
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
