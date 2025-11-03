import { Link, useNavigate } from "react-router-dom";
import Button from "../button";
import styles from "./styles.module.css";
import Showeye from "../../assets/eye-password-show-svgrepo-com.svg";
import Hideeye from "../../assets/eye-password-hide-svgrepo-com.svg";
import CheckedIcon from "../../assets/checked_189677.png";
import CancelIcon from "../../assets/white_xicon-removebg-preview.png";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, dataBase } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import * as yup from "yup";
import React from "react";
const SignupForm = () => {
  let navigate = useNavigate();
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfrimPassword] = useState(false);
  let [error, setError] = useState({});
  let [submittion, setSubmittion] = useState(false);
  let [CancelModal, setCancelModal] = useState("");
  let [formData, setFormData] = useState({
    Image: "",
    surname: "",
    firstname: "",
    email: "",
    number: "",
    status: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    if (e.target.name === "Image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, Image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setFormData({ ...formData, password: e.target.value });
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
    setFormData({ ...formData, confirmPassword: e.target.value });
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }
  function toggleConfirmPassword() {
    setShowConfrimPassword(!showConfirmPassword);
  }
  function modalCancel() {
    setCancelModal("Cancel");
  }

  function handleProfile() {
    navigate("/profile", { state: { formData } });
  }

  const schema = yup.object().shape({
    Image: yup.mixed().test("file", "Field must not be empty", (value) => {
      if (!value) return false;
      return true;
    }),
    surname: yup
      .string()
      .required("Field must not be empty")
      .min(2, "Surname must be at least 2 characters"),
    firstname: yup
      .string()
      .required("Field must not be empty")
      .min(2, "First name must be at least 2 characters"),
    email: yup
      .string()
      .email("Not a valid email")
      .required("Field must not be empty"),
    number: yup.string().required("Field must not be empty"),
    status: yup.string().required("Field must not be empty"),
    password: yup
      .string()
      .required("Field must not be empty")
      .min(10, "Password must not be less than 10"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password not the same"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setSubmittion(true);
      try {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(dataBase, "Users", user.uid), {
            email: formData.email,
            Firstname: formData.firstname,
            Surname: formData.surname,
            Number: formData.number,
            Status: formData.status,
            Image: formData.Image,
          });
        }
        console.log("account created successfully");
      } catch (error) {
        setSubmittion(false);
      }
    } catch (error) {
      setError(
        error.inner.reduce((acc, current) => {
          acc[current.path] = current.message;
          return acc;
        }, {})
      );
      setSubmittion(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <section className={styles.formSection}>
          <div>
            <div>
              <label>Upload Your Image</label>
              <input
                onChange={handleChange}
                name="Image"
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
              />
              <p className={styles.errorText}>{error.Image}</p>
            </div>
            <div>
              <label>Surname</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Surname"
                name="surname"
                value={formData.surname}
              />
              <p className={styles.errorText}>{error.surname}</p>
            </div>
            <div>
              <label>Firstname</label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Firstname"
                name="firstname"
                value={formData.firstname}
              />
              <p className={styles.errorText}>{error.firstname}</p>
            </div>
            <div>
              <label>E-mail</label>
              <input
                onChange={handleChange}
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
              />
              <p className={styles.errorText}>{error.email}</p>
            </div>
          </div>

          <div>
            <div>
              <label>Status</label>
              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
              >
                <option>Select Status</option>
                <option value="USER">USER</option>
                <option value="AUTHOR">AUTHOR</option>
              </select>
              <p className={styles.errorText}>{error.status}</p>
            </div>

            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="number"
                onChange={handleChange}
                placeholder="Enter Your phone Number"
              />
              <p className={styles.errorText}>{error.number}</p>
            </div>

            <div className={styles.passwordWrapper}>
              <label>Password</label>
              <input
                onChange={handlePasswordChange}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                name="password"
              />
              <img
                onClick={togglePassword}
                className={styles.formPasswordEye}
                src={showPassword ? Hideeye : Showeye}
                alt="showeye"
              />
              <p className={styles.errorText}>{error.password}</p>
            </div>

            <div>
              <label>Confirm Password</label>
              <div className={styles.confirmPasswordWrapper}>
                <input
                  onChange={handleConfirmPasswordChange}
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Confirm your Password"
                  name="confirmPassword"
                />
                <img
                  onClick={toggleConfirmPassword}
                  className={styles.formConfirmPasswordEye}
                  src={showConfirmPassword ? Hideeye : Showeye}
                  alt="showeye"
                />
              </div>
              <p className={styles.errorText}>{error.confirmPassword}</p>
            </div>
          </div>
        </section>

        <div className={styles.formBtn}>
          <Button text="Create Account" btnstyles="secondary" />
          <p>Already have an account?</p>
          <Link to="/loginpage">
            <Button text="Log In" btnstyles="secondary" />
          </Link>
        </div>
      </form>

      {submittion && (
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
            <p>Account Created Successfully</p>
            <img
              onClick={modalCancel}
              className={styles.modalCancel}
              src={CancelIcon}
              alt="cancel"
            />
            <Button
              onClick={handleProfile}
              text="View Profile"
              btnstyles="primary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SignupForm;
