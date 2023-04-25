import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const verifyToken = async (credentials: any) => {
  try {
    const response = await fetch(
      "https://wheretowatch-vps.herokuapp.com/api/verify-token/",
      {
        method: "POST",

        headers: new Headers({
          Authorization: "Token " + credentials.token,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.detail == "Invalid token.") {
      Cookies.remove("authToken");
    }

    const userData = await Cookies.get("userData");

    if (userData) {
      const [myObject, setMyObject] = useState(null);

      const parsedObject = JSON.parse(userData);
      setMyObject(parsedObject);

      console.log(myObject.image_profile);
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export default { verifyToken };
