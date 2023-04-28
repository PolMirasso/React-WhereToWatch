import navbar_styles from "../../../module/navbar.module.css";
import film_styles from "../../../module/filmList.module.css";
import profile_styles from "../../../module/profile.module.css";

export const EditProfilePage = () => {
  return (
    <div
      className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    >
      {" "}
      <div className={profile_styles.frame}>
        <div className={profile_styles.center}></div>
      </div>
    </div>
  );
};
