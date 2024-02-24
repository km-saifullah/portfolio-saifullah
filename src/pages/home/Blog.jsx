import React from "react";
import { blogs } from "../../data/blogs";
import SectionHeading from "../../utils/SectionHeading";
import Image from "../../utils/Image";
import Button from "../../utils/Button";

const Blog = () => {
  return (
    <section className="py-[110px]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="pb-[32px]">
          <SectionHeading title="Blogs" />
        </div>
        <div className="flex items-center gap-x-[50px] gap-y-[34px] flex-wrap">
          {blogs.map((blog, index) => (
            <div
              className="bg-bannerBg w-[375px] pb-3 rounded-t-lg"
              key={index}
            >
              <div className="w-[375px] h-[200px] overflow-hidden rounded-t-lg trasnsition-all ease-linear duration-300 hover:scale-95">
                <figure>
                  <Image
                    imgSrc={blog.blogThumbnail}
                    altText="blog image"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </div>
              <div className="p-3 pb-3">
                <p className="text-base text-textColor font-normal font-openSans leading-[135%]">
                  {blog.postAt} |{" "}
                  <span className="text-primary">{blog.blogTag}</span>
                </p>
                <h4 className="pt-3 pb-3 text-heading text-[25px] font-semibold font-roboto leading-[140%] capitalize">
                  {blog.title}
                </h4>
                <a
                  href={blog.blogLink}
                  target="_blank"
                  className="px-4 py-2 transition-all ease-linear duration-300 bg-primary text-white text-base font-bold font-openSans leading-[135%] capitalize hover:bg-white hover:text-heading"
                >
                  read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
