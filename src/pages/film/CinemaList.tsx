import { useState, useEffect, useRef } from "react";
import moment from "moment";

//PROPS CINEMES HORA
interface CinemaHoresProps {
  cine: string;
  hora: string[];
}

function CinemaList(props) {
  const [openCinema, setOpenCinema] = useState(false);
  const [datacinema, setCinemaData] = useState<CinemaHoresProps>();
  const today = moment().format("YYYY-MM-DD");
  const handleOpenCinema = () => {
    setOpenCinema(!openCinema);
  };

  const handleCityClick = (selectedCity: {
    provinceName: string;
    cityCode: number;
  }) => {
    fetchDataCinemes(selectedCity.cityCode);

    console.log(
      `Selected city: ${selectedCity.provinceName}, ${selectedCity.cityCode}`
    );
  };

  //Dades tots els cinemes de cada localitat

  async function fetchDataCinemes(idcine) {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getCinemaData/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            film_id: props.propsReceive.filmId,
            idprov: idcine,
            date: today,
          }).toString(),
        }
      );
      const cinemadata = await response.json();
      setCinemaData(cinemadata);
      console.log("data cinemes");
      console.log(cinemadata);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  return (
    <li
      key={props.propsReceive.cityCode}
      onClick={() => {
        handleOpenCinema();
        handleCityClick({
          provinceName: props.propsReceive.cityName,
          cityCode: Number(props.propsReceive.cityCode),
        });
      }}
    >
      {props.propsReceive.cityName}
      {openCinema && datacinema?.toString()}
    </li>
  );
}
export default CinemaList;
