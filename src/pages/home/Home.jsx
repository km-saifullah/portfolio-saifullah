import React from "react";
import Banner from "../../components/banner/Banner";
import About from "./About";
import Services from "./Services";
import Blog from "./Blog";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Services />
      <Blog />
    </>
  );
};

export default Home;
