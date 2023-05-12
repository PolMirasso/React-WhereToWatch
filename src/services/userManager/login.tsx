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
        nsfw_content: data.nsfw_content,
        image_profile: data.image_profile,
        description: data.description,
      };

      setCookie("authToken", data.token, data.expiry);
      setCookie("userData", JSON.stringify(userData), data.expiry);

      return { status: "ok", userData };
    } else {
      return { status: "error", data };
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export default { login };
