import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineWbSunny } from "react-icons/md";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

const Navbar = () => {
  return (
    <nav className="absolute top-0 right-0 w-[100%] z-[555]">
      <div className="md:max-w-container mx-auto p-2 md:p-[30px]">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              <h3 className="font-roboto text-base sm:text-xl md:text-2xl lg:text-[25px] text-heading leading-[140%] font-semibold transition-all ease-linear duration-300 hover:text-primary">
                Khaled Md {""}
                <span className="text-primary transition-all ease-linear duration-300 hover:text-heading">
                  Saifullah
                </span>
              </h3>
            </Link>
          </div>
          <div>
            <ul className="hidden lg:flex items-center md:gap-x-[30px] xl:gap-x-[60px]">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary" : "text-navLink"
                    } text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 capitalize`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary" : "text-navLink"
                    } text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 capitalize`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary" : "text-navLink"
                    } text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 capitalize`
                  }
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary" : "text-navLink"
                    } text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 capitalize`
                  }
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/package"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary" : "text-navLink"
                    } text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 capitalize`
                  }
                >
                  NPM Package
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary" : "text-navLink"
                    } text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 capitalize`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <div className="flex items-center justify-center gap-x-4">
            <div className="flex items-center justify-center text-[#EEF5FF] text-base sm:text-xl md:text-[35px] cursor-pointer bg-[rgba(34,34,34,0.75)] w-[40px] sm:w-[50px] md:w-[70px] lg:w-[100px]  h-[20px] sm:h-[30px] md:h-[40px] lg:h-[50px] rounded-[60px]">
              <MdOutlineWbSunny />
            </div>
            <div className="block lg:hidden text-3xl md:text-4xl cursor-pointer text-heading transition-all ease-linera duration-300 hover:text-textColor">
              <HiOutlineBars3BottomLeft />
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
