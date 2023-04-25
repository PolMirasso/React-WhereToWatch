import React from "react";
import navbar_styles from "../../../module/navbar.module.css";
import film_styles from "../../../module/filmList.module.css";

export const CreateListPage = () => {
  return (
    <div
      className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    >
      {" "}
      <form action="" method="POST">
        <input
          type="text"
          name="list_name"
          placeholder="Escriu el nom de la llista"
        />
        <textarea
          name="list_desc"
          rows={10}
          placeholder="Descripció"
        ></textarea>

        <button>Save</button>
      </form>
    </div>
  );
};
