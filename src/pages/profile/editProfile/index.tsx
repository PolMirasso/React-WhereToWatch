import navbar_styles from "../../../module/navbar.module.css";
import film_styles from "../../../module/filmList.module.css";
import profile_styles from "../../../module/profile.module.css";
import editprofile_styles from "../../../module/profile/editprofile.module.css";
import { useNavigate } from "react-router-dom";

export const EditProfilePage = () => {
  return (
    <div
      className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    >
      {" "}
      <article className={editprofile_styles.lDdesignWidht}>
        <h1>Edit Your Profile</h1>
        <div className={editprofile_styles.card}>
          <label className={editprofile_styles.input}>
            <input
              className={editprofile_styles.inputField}
              type="text"
              placeholder=" "
            />
            <span className={editprofile_styles.inputLabel}>User Name</span>
          </label>
          <br />
          <label className={editprofile_styles.input}>
            <textarea
              className={editprofile_styles.inputField}
              placeholder="Im cool..."
            />
            <span className={editprofile_styles.inputLabel}>Description</span>
          </label>
          <br />
          <label className={editprofile_styles.input}>
            <input
              className={editprofile_styles.inputField}
              type="password"
              placeholder="**********"
            />
            <span className={editprofile_styles.inputLabel}>Password</span>
          </label>
          <br />
          <label className={editprofile_styles.input}>
            <input className={editprofile_styles.inputField} type="file" />
            <span className={editprofile_styles.inputLabel}>Imatge</span>
          </label>
          <div className={editprofile_styles.buttonGroup}>
            <button>Send</button>
            <button>
              <a href="/profile">Back</a>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
