const login = async (credentials: any) => {
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

    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export default { login };
