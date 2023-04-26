import Cookies from "js-cookie";

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

    console.log(data);

    const userData = {
      username: data.username,
      age: data.age,
      image_profile: data.image_profile,
    };

    Cookies.set("authToken", data.token);
    Cookies.set("userData", JSON.stringify(userData));

    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export default { login };
