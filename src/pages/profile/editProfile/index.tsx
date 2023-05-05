import navbar_styles from "../../../module/navbar.module.css";
import film_styles from "../../../module/filmList.module.css";
import profile_styles from "../../../module/profile.module.css";
import editprofile_styles from "../../../module/profile/editprofile.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import Cookies from "js-cookie";

export const EditProfilePage = () => {
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState();

  async function getUserData() {
    const userData = Cookies.get("userData");

    if (userData) {
      const parsedObject = JSON.parse(userData);
      return setUserData(parsedObject);
    }
    return;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    >
      {" "}
      <article className={editprofile_styles.lDdesignWidht}>
        <h1>Edit Your Profile</h1>
        <div className={editprofile_styles.card}>
          <div className="mb-6">
            <div className="mx-auto w-60 text-center">
              <div className="relative w-60">
                {image ? (
                  <img
                    className="w-60 h-60 rounded-full absolute "
                    src={image}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-60 h-60 rounded-full absolute"
                    src={
                      userData
                        ? userData.image_profile
                        : "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png"
                    }
                    alt=""
                  />
                )}
                <label
                  htmlFor="image-input"
                  className="w-60 h-60 group hover:bg-gray-200 opacity-60 rounded-full  flex justify-center items-center cursor-pointer transition duration-500"
                >
                  <img
                    className="hidden group-hover:block w-12"
                    src="https://www.svgrepo.com/show/33565/upload.svg"
                    alt=""
                  />
                </label>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your username
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="WhereToWatch"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@wheretowatch.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>

          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
          <br />

          <div className={editprofile_styles.buttonGroup}>
            <button>Guardar</button>
            <button>
              <a href="/profile">Tornar</a>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
