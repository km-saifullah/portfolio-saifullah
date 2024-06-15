import React from "react";
import { blogs } from "../../data/blogs";
import SectionHeading from "../../utils/SectionHeading";
import Image from "../../utils/Image";
import Button from "../../utils/Button";
import { Link } from "react-router-dom";

const Blog = () => {
  let selectedBlog = blogs.slice(0, 6);
  return (
    <section className="py-[20px] lg:py-[30px]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="pb-[20px] lg:pb-[32px]">
          <SectionHeading title="Blogs" />
        </div>
        <div className="flex items-center justify-around gap-x-[50px] gap-y-[34px] flex-wrap">
          {selectedBlog.map((blog) => (
            <div
              className={`${
                blog.id % 2 == 0 ? "bg-bannerBg" : "bg-inputFieldBg"
              } w-[375px] pb-3 rounded-t-lg`}
              key={blog.id}
            >
              <div className="w-full lg:w-[375px] h-[200px] overflow-hidden rounded-t-lg trasnsition-all ease-linear duration-300 hover:scale-95">
                <figure>
                  <Image
                    imgSrc={blog.blogThumbnail}
                    altText="blog image"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </div>
              <div className="p-3 pb-3">
                <p
                  className={`text-base ${
                    blog.id % 2 == 0 ? "text-textColor" : "text-white"
                  } font-normal font-openSans leading-[135%]`}
                >
                  {blog.postAt} |{" "}
                  <span
                    className={`${
                      blog.id % 2 == 0 ? "text-primary" : "text-white"
                    }`}
                  >
                    {blog.blogTag}
                  </span>
                </p>
                <h4
                  className={`pt-3 pb-3 ${
                    blog.id % 2 != 0 ? "text-white" : "text-heading"
                  } text-lg lg:text-[18px] font-semibold font-roboto leading-[140%] capitalize`}
                >
                  {blog.title}
                </h4>
                <div className="pt-2">
                  <a
                    href={blog.blogLink}
                    target="_blank"
                    className="px-4 py-2 transition-all ease-linear duration-300 bg-primary text-white text-base font-bold font-openSans leading-[135%] capitalize hover:bg-white hover:text-heading"
                  >
                    read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center pt-6">
          <Link to="/blogs">
            <Button title="More Blogs ✏️" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
