import Hero from "../Components/Hero/Hero";
import Navbar from "../Components/Navbar/Navbar";
import Newsfetch from "../Components/NewsFetch/NewsFetch";
import PostCreated from "../Components/PostCreated/PostCreated";
import React from "react";
const Home = () => {
  return (
    <>
      <Hero />
      <PostCreated />
      <Newsfetch />
    </>
  );
};
export default Home;
