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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

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

  function handleSubmit(event) {
    event.preventDefault();

    fetch("/api/change_password/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setOldPassword("");
          setNewPassword("");
          setError("");
        } else {
          setError(
            "Failed to change password. Please check your old password and try again."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An unexpected error occurred. Please try again later.");
      });
  }

  return (
    // <div
    //   className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    // >
    //   {" "}
    //   <article className={editprofile_styles.lDdesignWidht}>
    //     <h1>Edit Your Profile</h1>
    //     <div className={editprofile_styles.card}>
    //       <div className="mb-6">
    //         <div className="mx-auto w-60 text-center">
    //           <div className="relative w-60">
    //             {image ? (
    //               <img
    //                 className="w-60 h-60 rounded-full absolute "
    //                 src={image}
    //                 alt=""
    //               />
    //             ) : (
    //               <img
    //                 className="w-60 h-60 rounded-full absolute"
    //                 src={
    //                   userData
    //                     ? userData.image_profile
    //                     : "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png"
    //                 }
    //                 alt=""
    //               />
    //             )}
    //             <label
    //               htmlFor="image-input"
    //               className="w-60 h-60 group hover:bg-gray-200 opacity-60 rounded-full  flex justify-center items-center cursor-pointer transition duration-500"
    //             >
    //               <img
    //                 className="hidden group-hover:block w-12"
    //                 src="https://www.svgrepo.com/show/33565/upload.svg"
    //                 alt=""
    //               />
    //             </label>
    //             <input
    //               id="image-input"
    //               type="file"
    //               accept="image/*"
    //               className="hidden"
    //               onChange={handleImageChange}
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       <form
    //         onSubmit={handleSubmit}
    //         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    //       >
    //         <div className="mb-4">
    //           <label
    //             className="block text-gray-700 font-bold mb-2"
    //             htmlFor="username"
    //           >
    //             Username
    //           </label>
    //           <input
    //             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //             type="text"
    //             id="username"
    //             name="username"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label
    //             className="block text-gray-700 font-bold mb-2"
    //             htmlFor="email"
    //           >
    //             Email
    //           </label>
    //           <input
    //             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //             type="email"
    //             id="email"
    //             name="email"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label
    //             className="block text-gray-700 font-bold mb-2"
    //             htmlFor="description"
    //           >
    //             Description
    //           </label>
    //           <textarea
    //             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //             id="description"
    //             name="description"
    //           />
    //         </div>
    //         <div className="flex items-center justify-between">
    //           <button
    //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //             type="submit"
    //           >
    //             Save
    //           </button>
    //         </div>
    //       </form>

    //       <form onSubmit={handleSubmit}>
    //         <div>
    //           <label htmlFor="oldPassword">Old Password:</label>
    //           <input
    //             type="password"
    //             id="oldPassword"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             placeholder="•••••••••"
    //             required
    //             value={oldPassword}
    //             onChange={(event) => setOldPassword(event.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="newPassword">New Password:</label>
    //           <input
    //             type="password"
    //             id="newPassword"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             placeholder="•••••••••"
    //             required
    //             value={newPassword}
    //             onChange={(event) => setNewPassword(event.target.value)}
    //           />
    //         </div>
    //         {error && <div>{error}</div>}
    //         <button
    //           type="submit"
    //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //         >
    //           Guardar
    //         </button>
    //       </form>
    //     </div>
    //   </article>
    // </div>
    <>
      <br />
      <br />
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-zinc-800 w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
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
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <div className="w-full px-4 text-center mt-20"></div>
              </div>
              <div className="text-center mt-12">
                <input
                  type="text"
                  id="default-input"
                  defaultValue={userData ? userData.username : "User"}
                  className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 bg-gray-700 text-white focus:ring-yellow-500 focus:border-yellow-500"
                />

                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"></h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  <input
                    type="text"
                    id="default-input"
                    defaultValue={userData ? userData.description : ""}
                    className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 bg-gray-700 text-white focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {userData ? (
                        <>
                          {" "}
                          Contingut NSFW:{" "}
                          {userData.user_nsfw ? "Activat" : "Desactivat"}
                        </>
                      ) : (
                        <> Contingut NSFW: Desactivat</>
                      )}
                    </p>
                  </div>

                  <button
                    className="middle none center rounded-lg bg-yellow-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true"
                    onClick={(event) => {
                      event.preventDefault();
                      history(`/editprofile`);
                    }}
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
