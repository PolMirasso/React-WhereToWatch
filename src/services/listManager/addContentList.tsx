const addContentList = async (credentials) => {
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/addToListContent/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + credentials.token,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          obj_id: credentials.obj_id,
          obj_type: credentials.obj_type,
          list_id: credentials.list_id,
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

export default { addContentList };
