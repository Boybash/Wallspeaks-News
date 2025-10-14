import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getDocs, collection, addDoc } from "firebase/firestore";
import { auth, dataBase } from "../firebase";
import styles from "./styles.module.css";
import Button from "../button";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(dataBase, "posts", postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
      }
    };
    fetchPost();
  }, [postId]);

  const getTimeAgo = (time) => {
    if (!time) return "just now";
    const timeParts = time.split(":");
    if (timeParts.length !== 3) return "just now";
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);
    const now = new Date();
    const currentTime =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const commentTime = hours * 3600 + minutes * 60 + seconds;
    let timeDiff = currentTime - commentTime;
    if (timeDiff < 0) {
      timeDiff += 24 * 3600;
    }
    const hoursDiff = Math.floor(timeDiff / 3600);
    const minutesDiff = Math.floor((timeDiff % 3600) / 60);
    const secondsDiff = timeDiff % 60;
    if (hoursDiff > 0) {
      return `commented ${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    } else if (minutesDiff > 0) {
      return `commented ${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
    } else {
      return `commented ${secondsDiff} second${secondsDiff > 1 ? "s" : ""} ago`;
    }
  };

  const handleAddComment = async (postId) => {
    try {
      const currentUser = auth.currentUser;
      const userDoc = await getDoc(doc(dataBase, "Users", currentUser.uid));
      const userData = userDoc.data();
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;
      await addDoc(collection(dataBase, "posts", postId, "comments"), {
        comment: newComment[postId],
        username: userData.Firstname || "Anonymous",
        userImage: userData.Image || "",
        time: time,
      });
      setNewComment((prevComment) => ({ ...prevComment, [postId]: "" }));
      fetchComments();
    } catch (error) {}
  };

  const fetchComments = async () => {
    const querySnapshot = await getDocs(
      collection(dataBase, "posts", postId, "comments")
    );
    const commentsData = querySnapshot.docs.map((doc) => doc.data());
    setComments(commentsData);
  };
  fetchComments();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <>
      <div className={styles.postContainer}>
        {!post ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className={styles.postImageContainer}>
              <img src={post.Images} alt="Images" />
            </div>
            <div className={styles.postContent}>
              <h2>{post.Title}</h2>
              <p>{post.Details}</p>
              <h4 className={styles.postAuthor}>Author: {post.Author}</h4>
              <i>
                {new Date(post.Date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </i>
              <i> {post.Time}</i>
            </div>
            <div className={styles.postCommentContainner}>
              <div className={styles.postCommentBox}>
                <textarea
                  placeholder="Add Comment"
                  className={styles.postComment}
                  type="text"
                  value={newComment[postId] || ""}
                  onChange={(e) =>
                    setNewComment((prevComment) => ({
                      ...prevComment,
                      [postId]: e.target.value,
                    }))
                  }
                />
                <Button
                  text="Comment"
                  btnstyles="secondary"
                  onClick={() => handleAddComment(postId)}
                />
              </div>

              <div className={styles.postCommentDisplay}>
                <h3>Comments:</h3>
                {comments.map((comment, index) => (
                  <ul key={index}>
                    <li>
                      {" "}
                      <div className={styles.commentHeader}>
                        <img
                          className={styles.commentImage}
                          src={comment.userImage}
                          alt="Images"
                        />
                        <div className={styles.commentInfo}>
                          <strong>{comment.username}</strong>
                          <span>{getTimeAgo(comment.time)}</span>
                        </div>
                      </div>
                      <p>{comment.comment}</p>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetails;
