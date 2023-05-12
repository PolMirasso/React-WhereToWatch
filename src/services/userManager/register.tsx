import Cookies from "js-cookie";

const setCookie = (name, value, expirationDate) => {
  const expires = new Date(expirationDate).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const register = async (credentials) => {
  try {
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("nsfw_content", "0");
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("image_profile", credentials.image_profile);
    formData.append("description", null);

    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/register/",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (response && response.status === 200) {
      const userData = {
        username: data.username,
        nsfw_content: data.nsfw_content,
        image_profile: data.image_profile,
        description: data.description,
      };

      setCookie("authToken", data.token, data.expiry);
      setCookie("userData", JSON.stringify(userData), data.expiry);

      return { status: "ok", userData };
    } else if (response.status === 400) {
      return { status: "error", data };
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { status: "error", error };
  }
};

export default { register };
