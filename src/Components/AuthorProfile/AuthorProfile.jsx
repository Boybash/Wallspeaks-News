import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { doc, getDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { dataBase } from "../firebase";

const AuthorProfile = () => {
  const { creatorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!creatorId) {
      setError("Creator ID is missing");
      return;
    }
    const fetchAuthor = async () => {
      try {
        const docRef = doc(dataBase, "Users", creatorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAuthor(docSnap.data());
        } else {
          setError("No author found");
        }
      } catch (error) {
        setError("Error fetching author: " + error.message);
      }
    };
    fetchAuthor();
  }, [creatorId]);

  return (
    <>
      <div className={styles.authorProfileContainer}>
        {error && <p>{error}</p>}
        {!author ? (
          <p> Loading... </p>
        ) : (
          <div className={styles.authorProfileBox}>
            <div className={styles.authorProfileImage}>
              <img src={author.Image} alt="Images" />
            </div>
            <p>Firstname: {author.Firstname}</p>
            <p>Surname: {author.Surname}</p>
            <p>Email: {author.email}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthorProfile;
