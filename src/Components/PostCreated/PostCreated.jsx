import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import Button from "../button";
import styles from "./styles.module.css";
import { dataBase, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { SearchContext } from "../SearchContext";

const PostCreated = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(dataBase, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (location.state && location.state.formData) {
      const addPost = async () => {
        await addDoc(collection(dataBase, "posts"), location.state.formData);
      };
      addPost();
    }
  }, [location.state]);

  const filteredPosts = posts.filter((post) => {
    const postData =
      `${post.Title} ${post.Author} ${post.Cartegory} ${post.Details}`.toLowerCase();
    return postData.includes(searchTerm.toLowerCase());
  });

  function handlePostDetails(postId) {
    navigate(`/postdetailspage/${postId}`);
  }
  function handleAuthorProfile(creatorId) {
    navigate(`/authorprofile/${creatorId}`);
  }
  return (
    <>
      <div className={styles.postContainer}>
        {searchTerm
          ? filteredPosts.map((post) => (
              <div key={post.id} className={styles.postBox}>
                <div>
                  <img src={`${post.Images}`} alt="Images" />
                </div>
                <div className={styles.postBoxContent}>
                  <h2>{post.Title}</h2>
                  <p className={styles.postCartegory}>{post.Cartegory}</p>
                  <p className={styles.postBoxAuthor}>
                    {" "}
                    <span onClick={() => handleAuthorProfile(post.creatorId)}>
                      Author: {post.Author}{" "}
                    </span>
                  </p>
                </div>
                <Button
                  onClick={() => handlePostDetails(post.id)}
                  text="Full Details"
                  btnstyles="secondary"
                />
                {auth.currentUser &&
                  auth.currentUser.uid === post.creatorId && (
                    <div>
                      <Button
                        text="Delete"
                        btnstyles="secondary"
                        onClick={() => handleDeletePost(post.id)}
                      />
                    </div>
                  )}
              </div>
            ))
          : posts.map((post) => (
              <div key={post.id} className={styles.postBox}>
                <div>
                  <img src={`${post.Images}`} alt="Images" />
                </div>
                <div className={styles.postBoxContent}>
                  <h2>{post.Title}</h2>
                  <p className={styles.postCartegory}>{post.Cartegory}</p>
                  <p className={styles.postBoxAuthor}>
                    {" "}
                    <span onClick={() => handleAuthorProfile(post.creatorId)}>
                      Author: {post.Author}{" "}
                    </span>
                  </p>
                </div>
                <Button
                  onClick={() => handlePostDetails(post.id)}
                  text="Full Details"
                  btnstyles="secondary"
                />
              </div>
            ))}
      </div>
    </>
  );
};
export default PostCreated;
