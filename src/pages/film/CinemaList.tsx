import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import moment from "moment";

//PROPS CINEMES PROVINCIA

interface ProvinceData {
  [provinceName: string]: { [cityCode: number]: string };
}

function CinemaList(props) {
  let film_id_scraping;
  const [showSquare, setShowSquare] = useState(false);
  const [dataListCinema, setfilmdataListCinema] = useState<ProvinceData>();
  const [datacinema, setCinemaData] =
    useState<{ cine: string; hora: string[] }[]>();
  const handleClick = () => {
    setShowSquare(false);
  };

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
      const data = await response.json();
      setfilmdataListCinema(data);
      console.log("data localitat");
      console.log(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  //Dades totes les hores dels cinemes

  async function fetchDataCinemes(idcine) {
    try {
      film_id_scraping = dataListCinema.film_id.toString();
      console.log(film_id_scraping);
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getCinemaData/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            film_id: film_id_scraping.toString(),
            idprov: idcine,
            date: today,
          }).toString(),
        }
      );
      const cinemadata = await response.json();
      setCinemaData(cinemadata);
      console.log("data cinemes");
      console.log(cinemadata);
      setShowSquare(true);
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
        {showSquare && datacinema && (
          <div className={`${film_styles.season_content_container}`}>
            <h1>Información de cinemes:</h1>
            {datacinema.map((cinema, index) => (
              <div key={index}>
                <h1>{cinema.cine}</h1>
                {cinema.hora && cinema.hora.length > 0 ? (
                  <ul>
                    {cinema.hora.map((horaItem, index) => (
                      <li key={index}>·{horaItem}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay datos de horarios disponibles para este cine.</p>
                )}
              </div>
            ))}
            <button onClick={handleClick}>Tancar horari</button>
          </div>
        )}
      </>
    </>
  );
}

export default CinemaList;
