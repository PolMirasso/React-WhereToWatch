import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import moment from "moment";

//PROPS CINEMES PROVINCIA

interface ProvinceData {
  [provinceName: string]: { [cityCode: number]: string };
}

//PROPS CINCE HORA
interface CinemaHoresProps {
  cine: string;
  hora: string[];
}

function CinemaList(props) {
  let film_id_scraping;
  const [dataListCinema, setfilmdataListCinema] = useState<ProvinceData>();
  const [datacinema, setCinemaData] = useState<CinemaHoresProps>();
  const today = moment().format("YYYY-MM-DD");

  //Dades tots els cinemes de cada localitat

  async function fetchDataLocalitat() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getFilmDataCinema/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            film_name: props.propsReceive.title,
          }).toString(),
        }
      );
      const dataListCinema = await response.json();
      setfilmdataListCinema(dataListCinema);
      console.log("data localitat");
      console.log(dataListCinema);
      film_id_scraping = dataListCinema.film_id;
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  //Dades totes les hores dels cinemes

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
            film_id: film_id_scraping,
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

  useEffect(() => {
    fetchDataLocalitat();
  }, [props.propsReceive.title]);

  return (
    <>
      <>
        <div>
          {dataListCinema &&
            Object.entries(dataListCinema).map(([provinceName, cityData]) => {
              if (provinceName === "film_id") {
                return null;
              }
              return (
                <div key={provinceName}>
                  <h1>{provinceName}</h1>
                  <br />

                  {Object.entries(cityData).map(([cityCode, cityName]) => (
                    <div key={cityCode}>
                      <button onClick={() => fetchDataCinemes(cityCode)}>
                        <h3>{cityName}</h3>
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </>
    </>
  );
}
export default CinemaList;
