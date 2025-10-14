import { createContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  const addPost = (post) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts, post];
      localStorage.setItem("posts", JSON.stringify(newPosts));
      return newPosts;
    });
  };

  const deletePost = (index) => {
    setPosts((prevPosts) => {
      const newPosts = prevPosts.filter(
        (post, postIndex) => postIndex !== index
      );
      localStorage.setItem("posts", JSON.stringify(newPosts));
      return newPosts;
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
