import { useState } from "react";

interface User {
  token: string;
  expiry: string;
  image_profile: string;
  username: string;
  age: number;
}

export const useUser = () => {
  const [user, setUser] = useState<User>({
    token: "",
    expiry: "",
    image_profile:
      "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png",
    username: "Usuari",
    age: 0,
  });

  return { user, setUser };
};
