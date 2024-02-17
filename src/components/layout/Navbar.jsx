import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineWbSunny } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="absolute top-0 right-0 w-[100%] z-[555]">
      <div className="max-w-container mx-auto p-[30px]">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              <h3 className="font-roboto text-[25px] text-heading leading-[140%] font-semibold transition-all ease-linear duration-300 hover:text-primary">
                Khaled Md{" "}
                <span className="text-primary transition-all ease-linear duration-300 hover:text-heading">
                  Saifullah
                </span>
              </h3>
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-x-[60px]">
              <li className="text-navLink text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 hover:text-textColor uppercase">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-navLink text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 hover:text-textColor uppercase">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="text-navLink text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 hover:text-textColor uppercase">
                <NavLink to="/services">Services</NavLink>
              </li>
              <li className="text-navLink text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 hover:text-textColor uppercase">
                <NavLink to="/blogs">Blogs</NavLink>
              </li>
              <li className="text-navLink text-[18px] font-roboto font-medium leading-[140%] transition-all ease-linear duration-300 hover:text-textColor uppercase">
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center text-[#EEF5FF] text-[35px] cursor-pointer bg-[rgba(34,34,34,0.75)] w-[100px] h-[50px] rounded-[60px]">
            <MdOutlineWbSunny />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
