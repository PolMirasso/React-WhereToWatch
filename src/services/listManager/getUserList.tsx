const getList = async (credentials) => {
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/getUserLists/",
      {
        method: "POST",
        headers: new Headers({
          Authorization: "Token " + credentials.token,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      return { status: "ok", data };
    } else {
      return { status: "error", data };
    }
  } catch (error) {
    console.error("Error user list:", error);
  }
};

export default { getList };
