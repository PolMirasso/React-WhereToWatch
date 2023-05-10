import Cookies from "js-cookie";

const removeFromListContent = async (props) => {
  async function getToken() {
    const token = await Cookies.get("authToken");
    return token;
  }
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/removeFromListContent/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + (await getToken()),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          obj_id: props.obj_id,
          obj_type: props.obj_type,
          list_id: props.list_id,
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

export default { removeFromListContent };
