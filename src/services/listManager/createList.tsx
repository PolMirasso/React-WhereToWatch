import Cookies from "js-cookie";

const createList = async (props) => {
  async function getToken() {
    const token = await Cookies.get("authToken");
    return token;
  }
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/createList/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + (await getToken()),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          list_name: props.newListName,
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

export default { createList };
