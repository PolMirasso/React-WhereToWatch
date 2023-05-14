import Cookies from "js-cookie";

async function getToken() {
  const token = await Cookies.get("authToken");
  return token;
}
const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};
const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/`;
};

const changeDescription = async (new_description) => {
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/changeDescription/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + (await getToken()),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          new_description: new_description,
        }).toString(),
      }
    );
    const data = await response.json();

    if (response.ok) {
      const existingUserData = JSON.parse(getCookie("userData"));

      existingUserData.description = new_description;

      setCookie("userData", JSON.stringify(existingUserData));
    } else {
      console.log("error get list");
      console.log(data);
      return { status: "error", data };
    }
  } catch (error) {
    console.error("Error adding content list:", error);
  }
};

const changeNSFW = async (new_NSFW) => {
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/changeNSFW/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + (await getToken()),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          new_nsfw_content: new_NSFW == true ? "1" : "0",
        }).toString(),
      }
    );
    const data = await response.json();

    if (response.ok) {
      const existingUserData = JSON.parse(getCookie("userData"));

      existingUserData.user_nsfw = new_NSFW;

      setCookie("userData", JSON.stringify(existingUserData));
    } else {
      console.log("error get list");
      console.log(data);
      return { status: "error", data };
    }
  } catch (error) {
    console.error("Error adding content list:", error);
  }
};

const changeProfileImage = async (new_Img) => {
  try {
    const formData = new FormData();
    formData.append("new_image_profile", new_Img);
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/changeUserImage/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + (await getToken()),
        }),
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      const existingUserData = JSON.parse(getCookie("userData"));

      existingUserData.image_profile = data.image_url;

      setCookie("userData", JSON.stringify(existingUserData));
    } else {
      console.log("error get list");
      console.log(data);
      return { status: "error", data };
    }
  } catch (error) {
    console.error("Error adding content list:", error);
  }
};
const changePassword = async (old_password, new_password, confirm_password) => {
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/changePassword/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + (await getToken()),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          old_password: old_password,
          new_password: new_password,
          confirm_password: confirm_password,
        }).toString(),
      }
    );
    const data = await response.json();

    if (response.ok) {
      return { status: "ok", data };
    } else {
      console.log("error get list");
      console.log(data);
      return { status: "error", data };
    }
  } catch (error) {
    console.error("Error adding content list:", error);
  }
};

export default {
  changeDescription,
  changeNSFW,
  changePassword,
  changeProfileImage,
};
