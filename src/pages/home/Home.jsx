import React from "react";
import Banner from "../../components/banner/Banner";
import About from "./About";
import Services from "./Services";
import Blog from "./Blog";
import Contact from "./Contact";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Services />
      <Blog />
      <Contact />
    </>
  );
};

export default Home;
