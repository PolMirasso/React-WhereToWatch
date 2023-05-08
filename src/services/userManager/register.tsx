import Cookies from "js-cookie";

const register = async (credentials) => {
  try {
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("nsfw_content", "0");
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("image_profile", credentials.image_profile);

    console.log(credentials);

    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/register/",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);
    if (response && response.status === 200) {
      const userData = {
        username: data.user.username,
        nsfw_content: data.user.nsfw_content,
        image_profile: data.user.image_profile,
      };

      Cookies.set("authToken", data.token);
      Cookies.set("userData", JSON.stringify(userData));

      return { status: "ok", userData };
    } else if (response.status === 400) {
      return { status: "error", data };
    }

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log("Response:", data);
    //   const userData = {
    //     username: data.username,
    //     age: data.age,
    //     image_profile: data.image_profile,
    //   };

    //   Cookies.set("authToken", data.token);
    //   Cookies.set("userData", JSON.stringify(userData));

    //   return { status: "ok", userData };
    // } else {
    //   console.error("Error:", response.statusText);
    // }
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { status: "error", error };
  }
};

export default { register };
