import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import profileManager from "../../../services/profileManager/profileManager";

export const EditProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "User",
    image_profile:
      "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png",
    description: "",
    user_nsfw: false,
  });

  const [newImageRender, setNewImageRender] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [newNSFWMode, setNewNSFWMode] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  async function getUserData() {
    const userDataNonParsed = Cookies.get("userData");

    if (userDataNonParsed) {
      const parsedObject = JSON.parse(userDataNonParsed);
      console.log(parsedObject);
      return setUserData(parsedObject);
    }
    return;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setNewImageRender(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (Cookies.get("authToken") === undefined) {
      history("/login");
    } else {
      getUserData();
    }
  }, []);

  async function saveChanges(event) {
    event.preventDefault();

    if (newImage !== null) {
      profileManager.changeProfileImage(newImage);
    }
    if (newDescription !== "") {
      if (newDescription !== (userData ? userData.description : "")) {
        profileManager.changeDescription(newDescription);
      }
    }
    if (oldPassword !== "") {
      if (newPassword !== "") {
        setError("");
        const result = await profileManager.changePassword(
          oldPassword,
          newPassword,
          newPassword
        );

        if (result.status != "ok") {
          setError(result.data.error);
        }
      }
    }
    if (newNSFWMode !== userData.user_nsfw) {
      profileManager.changeNSFW(newNSFWMode);
    }
    setTimeout(() => {
      history("/profile");
    }, 1000);
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-zinc-800 w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  {newImageRender ? (
                    <img
                      className="shadow-xl rounded-full h-60  w-60 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      src={newImageRender}
                      alt=""
                    />
                  ) : (
                    <img
                      className="shadow-xl rounded-full h-60 w-60 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
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
                    className="w-60 h-60 group hover:bg-gray-200 opacity-60 rounded-full  flex justify-center items-center cursor-pointer transition duration-500 -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  >
                    <img
                      className="hidden group-hover:block w-12 "
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
                <div className="w-full px-4 text-center mt-20"></div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {userData ? userData.username : "User"}
                </h3>

                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2"></h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>

                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Descripció"
                    defaultValue={
                      userData ? userData.description : "Descripció"
                    }
                    onChange={(event) => setNewDescription(event.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                        Canviar Contrasenya
                      </h3>
                      <span className="text-sm text-red-600">{error}</span>

                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Contrasenya Actual
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        onChange={(event) => setOldPassword(event.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nova Contrasenya
                      </label>
                      <input
                        type="password"
                        id="new_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        onChange={(event) => setNewPassword(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <div className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      <div className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                        NSFW
                      </div>
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        defaultChecked={userData.user_nsfw}
                        onChange={(event) => {
                          setNewNSFWMode(event.target.checked);
                        }}
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 `}
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Contingut NSFW
                      </label>
                    </div>
                  </div>

                  <button
                    className="middle w-screen none center rounded-lg bg-yellow-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true"
                    onClick={(event) => {
                      saveChanges(event);
                    }}
                  >
                    Guardar Canvis
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
