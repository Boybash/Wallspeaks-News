import { useState } from "react";
import Button from "../button";
import styles from "./style.module.css";
import CheckedIcon from "../../assets/checked_189677.png";
import CancelIcon from "../../assets/white_xicon-removebg-preview.png";
const Author = () => {
  let [error, setError] = useState("");
  let [submittion, setSubmittion] = useState(false);
  let [CancelModal, setCancelModal] = useState("");
  let [formData, setFormData] = useState({
    Images: "",
    surname: "",
    firstname: "",
    gender: "",
    DOB: "",
    qualification: "",
    COQ: "",
    YOE: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setSubmittion(true);
    } else {
      setSubmittion(false);
    }
  }
  function modalCancel() {
    setCancelModal("Cancel");
  }
  function validate() {
    let newErros = {};
    if (!formData.Images) {
      newErros.Images = "Field must not be empty";
    }
    if (!formData.surname) {
      newErros.surname = "Field must not be empty";
    }
    if (!formData.firstname) {
      newErros.firstname = "Field must not be empty";
    }
    if (!formData.gender) {
      newErros.gender = "Field must not be empty";
    }
    if (!formData.DOB) {
      newErros.DOB = "Field must not be empty";
    }
    if (!formData.qualification) {
      newErros.qualification = "Field must not be empty";
    }
    if (!formData.COQ) {
      newErros.COQ = "Field must not be empty";
    }
    if (!formData.YOE) {
      newErros.YOE = "Field must not be empty";
    }
    setError(newErros);
    return Object.keys(newErros).length === 0;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className={styles.formSection}>
          <div>
            <div>
              <label>Upload Your Image</label>
              <input
                onChange={handleChange}
                name="Images"
                value={formData.Images}
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
              />
              <p>{error.Images}</p>
            </div>
            <div>
              <label>Surname</label>
              <input
                onChange={handleChange}
                name="surname"
                value={formData.surname}
                type="text"
                placeholder="Enter Your Surname"
              />
              <p>{error.surname}</p>
            </div>
            <div>
              <label>Firstname</label>
              <input
                onChange={handleChange}
                name="firstname"
                value={formData.firstname}
                type="text"
                placeholder="Enter Your Firstname"
              />
              <p>{error.firstname}</p>
            </div>
            <div>
              <label>Gender</label>
              <select
                onChange={handleChange}
                name="gender"
                value={formData.gender}
              >
                <option>Select</option>
                <option value="Male">MALE</option>
                <option value="Female">FEMALE</option>
              </select>
              <p>{error.gender}</p>
            </div>
          </div>

          <div>
            <div>
              <label>Date Of Birth</label>
              <input
                onChange={handleChange}
                name="DOB"
                value={formData.DOB}
                type="date"
              />
              <p>{error.DOB}</p>
            </div>
            <div>
              <label>Qualification</label>
              <select
                onChange={handleChange}
                name="qualification"
                value={formData.qualification}
              >
                <option>Select</option>
                <option value="DEGREE">DEGREE</option>
                <option value="HND">HND</option>
                <option value="ND">ND</option>
                <option value="NCE">NCE</option>
                <option value="NC">NC</option>
              </select>
              <p>{error.qualification}</p>
            </div>
            <div>
              <label>Class of Qualification</label>
              <select onChange={handleChange} name="COQ" value={formData.COQ}>
                <option>Select</option>
                <option value="FIRST CLASS">FIRST CLASS</option>
                <option value="SECOND CLASS UPPER">SECOND CLASS UPPER</option>
                <option value="THIRD CLASS">THIRD CLASS</option>
              </select>
              <p>{error.COQ}</p>
            </div>
            <div>
              <label>Years of Experience</label>
              <input
                onChange={handleChange}
                name="YOE"
                value={formData.YOE}
                type="number"
              />
              <p>{error.YOE}</p>
            </div>
          </div>
        </section>
        <div className={styles.formBtn}>
          <Button text="Submit" btnstyles="secondary" />
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
            <p>Application Submitted Succesfully</p>
            <img
              onClick={modalCancel}
              className={styles.modalCancel}
              src={CancelIcon}
              alt="cancel"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Author;
