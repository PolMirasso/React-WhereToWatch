import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const checkToken = async (credentials: any) => {
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

    if (response.status === 401) {
      Cookies.remove("authToken");
      Cookies.remove("userData");
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export default { checkToken };
