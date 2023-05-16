import Cookies from "js-cookie";

const setCookie = (name, value, expirationDate) => {
  const expires = new Date(expirationDate).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const login = async (credentials) => {
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: credentials.username,
          password: credentials.password,
        }).toString(),
      }
    );
    const data = await response.json();

    if (response.ok) {
      const userData = {
        username: data.username,
        user_nsfw: data.user_nsfw,
        image_profile: data.image_profile,
        description: data.description,
      };

      setCookie("authToken", data.token, data.expiry);
      setCookie("userData", JSON.stringify(userData), data.expiry);

      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export default { login };
