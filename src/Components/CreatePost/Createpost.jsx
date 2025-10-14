import { useState } from "react";
import Button from "../button";
import Styles from "./style.module.css";
import CheckedIcon from "../../assets/checked_189677.png";
import CancelIcon from "../../assets/white_xicon-removebg-preview.png";
import PostCreated from "../PostCreated/PostCreated";
import { useNavigate } from "react-router-dom";
import { auth, dataBase } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Createpost = () => {
  let [formData, setFormData] = useState({
    Images: "",
    Title: "",
    Date: "",
    Time: "",
    Author: "",
    Cartegory: "",
    Details: "",
  });
  let [error, setError] = useState("");
  let [submittion, setSubmittion] = useState(false);
  let [CancelModal, setCancelModal] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.name === "Images") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, Images: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function validate() {
    let newError = {};
    if (!formData.Images) {
      newError.Images = "Field must not be empty";
    }
    if (!formData.Title) {
      newError.Title = "Field must be empty";
    }
    if (!formData.Date) {
      newError.Date = "Field must not be empty";
    }
    if (!formData.Time) {
      newError.Time = "Field must not be empty";
    }
    if (!formData.Author) {
      newError.Author = "Field must not be empty";
    }
    if (!formData.Cartegory) {
      newError.Cartegory = "Field must not be empty";
    }
    if (!formData.Details) {
      newError.Details = "Field must not be empty";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (validate()) {
      if (user) {
        const addPost = async () => {
          try {
            await addDoc(collection(dataBase, "posts"), {
              ...formData,
              creatorId: auth.currentUser.uid,
            });
            setSubmittion(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (error) {}
        };
        addPost();
      }
    } else {
      setSubmittion(false);
    }
  }

  function modalCancel() {
    setCancelModal("Cancel");
  }
  function handleViewProfile() {
    window.location.href = "profile";
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={Styles.formContainer}>
        <section className={Styles.formSection}>
          <div>
            <div>
              <label>Upload Images</label>
              <input
                onChange={handleChange}
                name="Images"
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
              />
              <p>{error.Images}</p>
            </div>
            <div>
              <label>Author's Name</label>
              <input
                onChange={handleChange}
                name="Author"
                value={formData.Author}
                type="text"
              />
              <p>{error.Author}</p>
            </div>
            <div>
              <label>Published Time</label>
              <input
                onChange={handleChange}
                name="Time"
                value={formData.Time}
                type="time"
              />
              <p>{error.Time}</p>
            </div>
            <div>
              <label>Published Date</label>
              <input
                onChange={handleChange}
                name="Date"
                value={formData.Date}
                type="date"
              />
              <p>{error.Date}</p>
            </div>
          </div>
          <div>
            <div>
              <label>Title</label>
              <input
                onChange={handleChange}
                name="Title"
                value={formData.Title}
                type="text"
                placeholder="Add Title"
              />
              <p>{error.Title}</p>
            </div>
            <div>
              <label>Cartegories</label>
              <select
                onChange={handleChange}
                name="Cartegory"
                value={formData.Cartegory}
              >
                <option>Select Cartegory</option>
                <option>Politics</option>
                <option>Culture</option>
                <option>Economy</option>
                <option>Science</option>
                <option>Technology</option>
                <option>Travels</option>
                <option>Sport</option>
                <option>World</option>
              </select>
              <p>{error.Cartegory}</p>
            </div>
            <div>
              <label>Post In Details</label>
              <textarea
                onChange={handleChange}
                name="Details"
                value={formData.Details}
                className={Styles.formDetails}
                type="text"
                placeholder="textarea for details"
              ></textarea>
              <p>{error.Details}</p>
            </div>
          </div>
        </section>
        <div className={Styles.formBtn}>
          <Button
            onClick={handleSubmit}
            text="Create Post"
            btnstyles="secondary"
          />
        </div>
      </form>

      {submittion && (
        <div
          className={`${Styles.formModal} ${
            CancelModal === "Cancel" ? Styles.Cancel : ""
          }`}
        >
          <div className={Styles.formModalContainer}>
            <img
              className={Styles.modalChecked}
              src={CheckedIcon}
              alt="checked"
            />
            <p>Post Created Successfully</p>
            <Button
              onClick={handleViewProfile}
              text="View Profile"
              btnstyles="primary"
            />
            <img
              onClick={modalCancel}
              className={Styles.modalCancel}
              src={CancelIcon}
              alt="cancel"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Createpost;
