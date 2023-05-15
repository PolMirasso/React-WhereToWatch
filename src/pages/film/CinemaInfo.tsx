import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import CinemaList from "./CinemaList";

//PROPS CINEMES PROVINCIA

interface ProvinceData {
  [provinceName: string]: { [cityCode: number]: string };
}

function CinemaInfo(props) {
  const [datalocalitat, setfilmDataLocalitat] = useState<ProvinceData>();
  const [provinceState, setProvinceState] = useState<{
    [province: string]: boolean;
  }>({});
  const [filmId, setFilmId] = useState(null);

  const toggleProvinceState = (province: string) => {
    setProvinceState({
      ...provinceState,
      [province]: !provinceState[province],
    });
  };

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
            film_name: props.propsrecive.title,
          }).toString(),
        }
      );
      const datalocalitat = await response.json();
      setfilmDataLocalitat(datalocalitat);
      console.log("data localitat");
      console.log(datalocalitat);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }
  useEffect(() => {
    fetchDataLocalitat();
  });
  return (
    <>
      <div className={film_styles.button_container}>
        {datalocalitat &&
          Object.keys(datalocalitat).map((province) => {
            if (province === "film_id") {
              setFilmId(datalocalitat[province]);
              return null;
            } else {
              return (
                <div key={province} className={film_styles.province_container}>
                  <h3
                    className={film_styles.button}
                    onClick={() => toggleProvinceState(province)}
                  >
                    {province}
                  </h3>
                  {Object.entries(datalocalitat[province]).map(
                    ([cityCode, cityName]) => (
                      <CinemaList
                        key={cityCode}
                        propsReceive={{
                          filmId: filmId,
                          cityCode: cityCode,
                          cityName: cityName,
                        }}
                      />
                    )
                  )}
                </div>
              );
            }
          })}
      </div>
    </>
  );
}
export default CinemaInfo;
