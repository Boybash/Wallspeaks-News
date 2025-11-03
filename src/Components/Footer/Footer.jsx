import Button from "../button";
import styles from "./styles.module.css";
import FacebookLogo from "../../assets/facebook_5968903.png";
import XLogo from "../../assets/social_13147358.png";
import InstagramLogo from "../../assets/instagram_3621464.png";
import TelegramLogo from "../../assets/telegram_3536705.png";
import YoutubeLogo from "../../assets/youtube-symbol_4096062.png";
import React from "react";
const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles.firstLineFooter}>
          <div>
            <h2>Stay informed and not</h2>
            <h2>Overwhelmed, subscribe now!</h2>
          </div>
          <div className={styles.footerSubscribe}>
            <input type="text" placeholder="Your Email....." />
            <Button text="Subscribe" btnstyles="primary" />
          </div>
        </div>

        <hr />
        <div className={styles.secondLineFooter}>
          <div>
            <h3>Business Hours</h3>
            <p>Monday - Friday: 08:00 - 20:00</p>
            <p>Saturday - Sunday: 09:00 - 20:00</p>
            <div className={styles.footerImage}>
              <img src={FacebookLogo} alt="Facebooklogo" />
              <img src={XLogo} alt="Xlogo" />
              <img src={InstagramLogo} alt="Instagramlogo" />
              <img src={TelegramLogo} alt="TelegramLogo" />
              <img src={YoutubeLogo} alt="Youtubelogo" />
            </div>
          </div>
          <div>
            <h3>Cartegories</h3>
            <ul>
              <li>Culture</li>
              <li>Economy</li>
              <li>Politics</li>
              <li>Science</li>
              <li>Technology</li>
            </ul>
          </div>
          <div>
            <h3>Information</h3>
            <ul>
              <li>Privacy and Policy</li>
              <li>Terms and Condition</li>
              <li>Site Map</li>
              <li>FAQ</li>
              <li>Locations</li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Contact</li>
              <li>Our Staff</li>
              <li>Help Centre</li>
              <li>Advertise</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
