import React, { useState, useEffect } from "react";
import navbar_styles from "../../module/navbar.module.css";
import film_styles from "../../module/filmList.module.css";
import profile_styles from "../../module/profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  function follow(): React.MouseEventHandler<HTMLAnchorElement> | undefined {
    throw new Error("Function not implemented.");
  }

  const history = useNavigate();
  const [userData, setUserData] = useState();

  async function getUserData() {
    const userData = Cookies.get("userData");

    if (userData) {
      const parsedObject = JSON.parse(userData);
      return setUserData(parsedObject);
    }
    return;
  }

  async function logout() {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    history("/");
    window.location.reload();
  }

  useEffect(() => {
    getUserData();
  }, []);

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
                src={`https://wheretowatch-vps.herokuapp.com${
                  userData
                    ? userData.image_profile
                    : "/static/defaultImageProfile.png"
                }`}
                width="70"
                height="70"
              />
            </div>

            <div className={profile_styles.name}>
              {userData ? userData.username : "User"}
            </div>
            <div className={profile_styles.job}>Description</div>

            <div className={profile_styles.actions}>
              <button className={profile_styles.btn}>
                <a href="/editprofile">Edit Profile</a>
              </button>
              <br />
              <button className={profile_styles.btn} onClick={logout}>
                Logout
              </button>
            </div>
          </div>

          <div className={profile_styles.stats}>
            <div className={profile_styles.box}>
              <span className={profile_styles.value}>523</span>
              <span className={profile_styles.parameter}>Films Watched</span>
            </div>
            <div className={profile_styles.box}>
              <span className={profile_styles.value}>138</span>
              <span className={profile_styles.parameter}>Series Watched</span>
            </div>
            <div className={profile_styles.box}>
              <span className={profile_styles.value}>661</span>
              <span className={profile_styles.parameter}>Total Watched</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
