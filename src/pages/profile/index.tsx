import React from "react";
import navbar_styles from "../../module/navbar.module.css";
import film_styles from "../../module/filmList.module.css";
import profile_styles from "../../module/profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const ProfilePage = () => {
  function follow(): React.MouseEventHandler<HTMLAnchorElement> | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    >
      {" "}
      <div className={profile_styles.frame}>
        <div className={profile_styles.center}>
          <div className={profile_styles.profile}>
            <div className={profile_styles.image}>
              <div className={profile_styles.circle1}></div>
              <div className={profile_styles.circle2}></div>
              <img
                src="https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png"
                width="70"
                height="70"
                alt="Jessica Potter"
              />
            </div>

            <div className={profile_styles.name}>Jessica Potter</div>
            <div className={profile_styles.job}>Visual Artist</div>
            <p className={profile_styles.job}>
              <i className="fas fa-map-marker-alt front-icons"></i>Seattle
            </p>

            <div className={profile_styles.actions}>
              <button className={profile_styles.btn}>Follow</button>
              <button className={profile_styles.btn}>Message</button>
            </div>
          </div>

          <div className={profile_styles.stats}>
            <div className={profile_styles.box}>
              <span className={profile_styles.value}>523</span>
              <span className={profile_styles.parameter}>Posts</span>
            </div>
            <div className={profile_styles.box}>
              <span className={profile_styles.value}>1387</span>
              <span className={profile_styles.parameter}>Likes</span>
            </div>
            <div className={profile_styles.box}>
              <span className={profile_styles.value}>146</span>
              <span className={profile_styles.parameter}>Follower</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
