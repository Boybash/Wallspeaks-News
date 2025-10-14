import { useState } from "react";
import Button from "../button";
import styles from "./style.module.css";
import CheckedIcon from "../../assets/checked_189677.png";
import CancelIcon from "../../assets/white_xicon-removebg-preview.png";
const Reportnews = () => {
  let [error, setError] = useState("");
  let [submittion, setSubmittion] = useState(false);
  let [CancelModal, setCancelModal] = useState("");
  let [formData, setFormData] = useState({
    images: "",
    summary: "",
    details: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function validate() {
    let newErrors = {};
    if (!formData.images) {
      newErrors.images = "Field must not be empty";
    }
    if (!formData.summary) {
      newErrors.summary = "Field must not be empty";
    }
    if (!formData.details) {
      newErrors.details = "Field must not be empty";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
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

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formSection}>
        <div>
          <label>Upload Images</label>
          <input
            onChange={handleChange}
            type="file"
            name="images"
            value={formData.images}
          />
          <p>{error.images}</p>
        </div>
        <div>
          <label>Summary</label>
          <input
            onChange={handleChange}
            type="text"
            name="summary"
            value={formData.summary}
          />
          <p>{error.summary}</p>
        </div>
        <div>
          <label>Situation In Details</label>
          <textarea
            onChange={handleChange}
            name="details"
            value={formData.details}
            className={styles.formDetails}
            type="text"
            placeholder="textarea for details"
          ></textarea>
          <p>{error.details}</p>
        </div>
        <div>
          <Button text="Report" btnstyles="secondary" />
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
            <p>Report Recieved Successfully</p>
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

export default Reportnews;
