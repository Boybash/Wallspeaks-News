import styles from "./styles.module.css";
import Button from "../button";
import { Link } from "react-router-dom";
import ReporterImage from "../../assets/ManReading.jpg";
import AppIcon from "../../assets/checked_189677.png";
import { useState, useEffect } from "react";
import { auth, dataBase } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const Hero = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const unSuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);

    return unSuscribe;
  }, []);

  const fetchUserdata = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(dataBase, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserStatus(userData.Status === "USER");
        }
      }
    });
  };

  useEffect(() => {
    fetchUserdata();
  }, []);
  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroDetails}>
          <ul>
            <li>
              <span>
                <img src={AppIcon} alt="AppIcon" />
              </span>
              Unleash the power of words, and let the journey begin.
            </li>
            <li>
              <span>
                <img src={AppIcon} alt="AppIcon" />
              </span>
              Explore the world of knowledge, one story at a time.
            </li>

            <li>
              <span>
                <img src={AppIcon} alt="AppIcon" />
              </span>
              Read, reflect, and rediscover the world around you.
            </li>
            <li>
              <span>
                <img src={AppIcon} alt="AppIcon" />
              </span>
              Where words come alive, and stories unfold.
            </li>
            <li>
              <span>
                <img src={AppIcon} alt="AppIcon" />
              </span>
              Discover new perspectives, spark new ideas.
            </li>
          </ul>

          <div className={styles.heroImageContainer}>
            <img src={ReporterImage} alt="Reporter" />
          </div>
        </div>
        <div className={styles.heroContent}>
          <div>
            <h1>
              500+<span> post per day</span>
            </h1>
            <p>
              Breaking news, expert analysis, and thought-provoking stories:
              Your premier source for news that matters, delivered with
              integrity and precision.
            </p>
            <span className={styles.heroBtn}>
              <Link
                to={
                  !isLoggedIn
                    ? "/signuppage"
                    : userStatus
                    ? "/profile"
                    : "/create"
                }
              >
                <Button text="Create Post" btnstyles="secondary" />
              </Link>
            </span>
          </div>
          <div>
            <h1>Authors</h1>
            <p>
              Stay up-to-date on the stories that shape our world: In-depth
              reporting, breaking news, and expert commentary, all in one place
            </p>
            <span className={styles.heroBtn}>
              <Link to="/signuppage">
                <Button text="Become an Author" btnstyles="secondary" />
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
