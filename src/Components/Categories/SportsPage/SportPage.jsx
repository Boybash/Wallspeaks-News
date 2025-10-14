import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../../button";

const SportPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(dataBase, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sport = postsData.filter((post) => post.Cartegory === "Sport");
      setPosts(sport);
    };
    fetchPosts();
  }, []);

  function handleAuthorProfile(creatorId) {
    navigate(`/authorprofile/${creatorId}`);
  }
  function handlePostDetails(postId) {
    navigate(`/postdetailspage/${postId}`);
  }
  return (
    <div className={styles.postContainer}>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
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
        ))
      )}
    </div>
  );
};

export default SportPage;
