import React , {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import clazz from "./HeroPage.module.css";

const HeroPage = ({token}) => {
  const { comicId } = useParams();
  const [heroData, setHeroData] = useState({img: "", description: "", name: ""})

  useEffect(() => {
    fetch(`http://localhost:5000/hero/${comicId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setHeroData(data));
  }, [comicId]);

  return (
    <div className={clazz.wrapper}>
      <img
        src={heroData.img}
        alt={heroData.img}
        className={clazz.img}
      />
      <div className={clazz.description_wrapper}>
        <div className={clazz.name}>{heroData.name}</div>
        <div className={clazz.description}>
          {heroData.description}
        </div>
      </div>
      {/* <div className={clazz.comics_wrapper}>
        <div className={clazz.title}>Comics:</div>
        <ul className={clazz.comics_list_wrapper}>
          <li>Comic 1</li>
          <li>Comic 2</li>
          <li>Comic 3</li>
          <li>Comic 4</li>
          <li>Comic 5</li>
        </ul>
      </div> */}
    </div>
  );
};

export default HeroPage;
