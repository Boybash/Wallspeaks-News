import Hero from "../Components/Hero/Hero";
import Navbar from "../Components/Navbar/Navbar";
import Newsfetch from "../Components/NewsFetch/NewsFetch";
import PostCreated from "../Components/PostCreated/PostCreated";
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
