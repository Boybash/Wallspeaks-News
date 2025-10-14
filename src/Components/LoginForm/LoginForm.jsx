import { Link, Navigate } from "react-router-dom";
import Button from "../button";
import styles from "./styles.module.css";
import Showeye from "../../assets/eye-password-show-svgrepo-com.svg";
import Hideeye from "../../assets/eye-password-hide-svgrepo-com.svg";
import { useEffect, useState } from "react";
import CheckedIcon from "../../assets/checked_189677.png";
import CancelIcon from "../../assets/white_xicon-removebg-preview.png";
import ErrorIcon from "../../assets/red-x-line-icon.png";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import * as yup from "yup";

const LoginForm = () => {
  let [password, setPassword] = useState("");
  let [showPassword, setshowPassword] = useState(false);
  let [formData, setFormData] = useState({ email: "", password: "" });
  let [errors, setErrors] = useState("");
  let [submittion, setSubmittion] = useState(null);
  let [CancelModal, setCancelModal] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredentials.user;
        setSubmittion(true);
        window.location.href = "/profile";
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setErrorMessage({ email: "User not found" });
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage({ password: "Incorrect password, please try again" });
        } else {
          setErrorMessage({ general: error.message });
        }
        setSubmittion(false);
      }
    } catch (error) {
      setErrors(
        error.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {})
      );
    }
  };

  function toggleEye() {
    setshowPassword(!showPassword);
  }

  function handleChange(e) {
    setPassword(e.target.password);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function modalCancel() {
    setCancelModal("Cancel");
  }

  return (
    <>
      <section className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>E-mail</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
            />
            <p className={styles.formError}>{errors.email}</p>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage.email}</p>
            )}
          </div>
          <div className={styles.passwordContainer}>
            <label>Password</label>
            <input
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              value={formData.password}
            />
            <p className={styles.formPasswordError}>{errors.password}</p>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage.password}</p>
            )}
            <img
              onClick={toggleEye}
              className={styles.formPasswordEye}
              src={showPassword ? Hideeye : Showeye}
            />
          </div>
          <div className={styles.formBtn}>
            <Button text="Log in" btnstyles="secondary" />
          </div>
        </form>
        <div className={styles.formSignIn}>
          <p>New to our platform?</p>
          <Link to="/signuppage">
            <Button text="Sign Up" btnstyles="secondary" />
          </Link>
        </div>
      </section>
      {submittion !== null &&
        (submittion ? (
          <div
            className={`${styles.formModal} ${
              CancelModal === "Cancel" ? styles.Cancel : ""
            }`}
          >
            <div className={styles.formModalContainer}>
              <img
                className={styles.modalChecked}
                src={CheckedIcon}
                alt="checked"
              />
              <p>Welcome Back</p>
              <img
                onClick={modalCancel}
                className={styles.modalCancel}
                src={CancelIcon}
                alt="cancel"
              />
            </div>
          </div>
        ) : (
          <div
            className={`${styles.formModal} ${
              CancelModal === "Cancel" ? styles.Cancel : ""
            }`}
          >
            <div className={styles.formModalContainer}>
              <img
                className={styles.modalChecked}
                src={ErrorIcon}
                alt="checked"
              />
              <p>User Not Found</p>
              <img
                onClick={modalCancel}
                className={styles.modalCancel}
                src={CancelIcon}
                alt="cancel"
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default LoginForm;
