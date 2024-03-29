import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  function follow(): React.MouseEventHandler<HTMLAnchorElement> | undefined {
    throw new Error("Function not implemented.");
  }

  const history = useNavigate();
  const [userData, setUserData] = useState({
    username: "User",
    image_profile:
      "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png",
    description: "",
    user_nsfw: false,
  });

  async function getUserData() {
    const userDataNonParsed = Cookies.get("userData");

    if (userDataNonParsed) {
      const parsedObject = JSON.parse(userDataNonParsed);
      return setUserData(parsedObject);
    }
    return;
  }

  useEffect(() => {
    if (Cookies.get("authToken") === undefined) {
      history("/login");
    } else {
      getUserData();
    }
  }, []);

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
                  <img
                    className="shadow-xl rounded-full h-60 w-60 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    src={
                      userData
                        ? userData.image_profile
                        : "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png"
                    }
                    alt=""
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
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {userData ? userData.username : "User"}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {userData ? userData.description : ""}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-screen lg:w-9/12 px-4 ">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700 ">
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
                  <br />
                  <br />
                  <button
                    className="middle w-screen none center rounded-lg bg-yellow-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
