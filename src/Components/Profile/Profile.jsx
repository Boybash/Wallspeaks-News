import { useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { auth, dataBase } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import Button from "../button";
import { signOut } from "firebase/auth";
import React from "react";
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedPostData, setUpdatedPostData] = useState({});
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();

  const fetchUserdata = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(dataBase, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserDetails(userData);
          setUserStatus(userData.Status === "USER");
          fetchUserPosts(user.uid);
        } else {
        }
      } else {
        setUserDetails(null);
      }
    });
  };

  useEffect(() => {
    fetchUserdata();
  }, []);

  const fetchUserPosts = async (userId) => {
    try {
      const q = query(
        collection(dataBase, "posts"),
        where("creatorId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setPosts([]);
      } else {
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      }
    } catch (error) {}
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/loginpage";
    } catch (error) {}
  };

  const handleDeletePost = async (postId) => {
    await deleteDoc(doc(dataBase, "posts", postId));
    setPosts(posts.filter((post) => post.id !== postId));
  };
  const handleEditPost = async (postId) => {
    await updateDoc(doc(dataBase, "posts", postId), updatedPostData);
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, ...updatedPostData } : post
      )
    );
    setEditingPost(null);
  };

  function handleCreatepost() {
    window.location.href = "/create";
  }
  return (
    <div className={styles.profileContainer}>
      {userDetails ? (
        <>
          <div className={styles.profileDetails}>
            <div className={styles.profileImage}>
              <img src={userDetails.Image} alt="Images" />
            </div>
            <h3> Welcome {userDetails.Firstname}</h3>
            <p>Email: {userDetails.email}</p>
            <p>FirstName: {userDetails.Firstname}</p>
            <p>Surname: {userDetails.Surname}</p>
            <p>Phone Number: {userDetails.Number}</p>
            <p>Status: {userDetails.Status}</p>
            <div className={`${userStatus ? styles.notActive : ""}`}>
              <Button
                onClick={handleCreatepost}
                text="Create Post"
                btnstyles="secondary"
              />
            </div>
            <Button
              onClick={handleLogOut}
              text="Log Out"
              btnstyles="secondary"
            />
          </div>
          <h3 className={`${userStatus ? styles.notActive : ""}`}>
            Your Post:
          </h3>
          <div className={styles.postContainer}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postBox}>
                <div>
                  <img src={`${post.Images}`} alt="Images" />
                </div>
                <div className={styles.postBoxContent}>
                  <h2>{post.Title}</h2>
                  <p>{post.Details}</p>
                  <Button
                    text="Delete"
                    btnstyles="secondary"
                    onClick={() => handleDeletePost(post.id)}
                  />
                  <Button
                    text="Edit"
                    btnstyles="secondary"
                    onClick={() => setEditingPost(post.id)}
                  />
                </div>
                {editingPost === post.id && (
                  <div className={styles.postEditContainer}>
                    <input
                      type="text"
                      value={updatedPostData.Title || post.Title}
                      onChange={(e) =>
                        setUpdatedPostData({
                          ...updatedPostData,
                          Title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      type="text"
                      value={updatedPostData.Details || post.Details}
                      onChange={(e) =>
                        setUpdatedPostData({
                          ...updatedPostData,
                          Details: e.target.value,
                        })
                      }
                    />
                    <Button
                      text="Save"
                      btnstyles="secondary"
                      onClick={() => handleEditPost(post.id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default Profile;
