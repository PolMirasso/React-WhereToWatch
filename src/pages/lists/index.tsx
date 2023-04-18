import { useParams } from "react-router-dom";
import navbar_styles from "../../module/navbar.module.css";
import film_styles from "../../module/filmList.module.css";

export const ListPage: React.FC = () => {
  return (
    <div
      className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    >
      {" "}
      <div>Pagina de llistes</div>
    </div>
  );
};
