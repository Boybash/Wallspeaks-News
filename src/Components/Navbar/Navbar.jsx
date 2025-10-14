import Button from "../button";
import Hamburger from "../../assets/white_bg_hamburger-removebg-preview.png";
import XIcon from "../../assets/icons8-multiply-64.png";
import styles from "./styles.module.css";
import UserIcon from "../../assets/user-svgrepo-com.svg";
import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import LoggedInIcon from "../../assets/green-person-10777 (1).png";
import LogOutIcon from "../../assets/exit_15796015.png";
import { useContext } from "react";
import { SearchContext } from "../SearchContext";

const Navbar = ({ onSearch }) => {
  let [DisplayClass, setDisplayClass] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setSearchTerm } = useContext(SearchContext);

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

  function toggleSidebar() {
    setDisplayClass("active");
  }
  function hideSidebar() {
    setDisplayClass("inactive");
  }

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/loginpage";
      console.log("user Logged out Successfully");
    } catch (error) {}
  };

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <section className={styles.headerSection}>
        <header>
          <div className={styles.toggle_Btn}>
            <img
              onClick={DisplayClass === "active" ? hideSidebar : toggleSidebar}
              className={styles.toggleIcon}
              src={DisplayClass === "active" ? XIcon : Hamburger}
              alt={DisplayClass === "active" ? "Xicon" : "Hamburger"}
            />
          </div>
          <div className={styles.tittle}>
            <h1>
              Wall<span>Speaks</span> News
            </h1>
            <p>All Voices Matter</p>
          </div>

          <div className={styles.nav_Btn}>
            <Link to={isLoggedIn ? "/profile" : "/loginpage"}>
              <img
                className={styles.navUserIcon}
                src={isLoggedIn ? LoggedInIcon : UserIcon}
                alt="UserIcon"
              />
            </Link>
            <Link
              className={isLoggedIn ? styles.inactive : ""}
              to="/signuppage"
            >
              <Button text="Sign Up" btnstyles="primary" />
            </Link>
          </div>
        </header>
        <section className={styles.nav}>
          <nav
            className={`${styles.navbarList} ${
              DisplayClass === "active"
                ? styles.active
                : DisplayClass === "inactive"
                ? styles.inactive
                : ""
            }`}
          >
            <ul>
              <li>
                <Link className={styles.navLink} to="/">
                  HOME
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/politics">
                  POLITICS
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/culture">
                  CULTURE
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/economy">
                  ECONOMY
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/science">
                  SCIENCE
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/technology">
                  TECHNOLOGY
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/travel">
                  TRAVELS
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/world">
                  WORLD
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/sport">
                  SPORT
                </Link>
              </li>
            </ul>
          </nav>
          <div
            className={`${styles.navSearch} ${
              DisplayClass === "active"
                ? styles.navSearchActive
                : DisplayClass === "inactive"
                ? styles.inactive
                : ""
            } `}
          >
            <input
              className={styles.searchInput}
              type="text"
              onChange={handleSearch}
              placeholder="Search......"
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default Navbar;
