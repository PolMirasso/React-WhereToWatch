import Cookies from "js-cookie";

const updateListName = async (props) => {
  async function getToken() {
    const token = await Cookies.get("authToken");
    return token;
  }
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/updateListName/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + (await getToken()),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          new_name: props.new_name,
          list_id: props.list_id,
        }).toString(),
      }
    );
    const data = await response.json();
    window.location.reload();
  } catch (error) {
    console.error("Error adding content list:", error);
  }
};

export default { updateListName };
