import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clazz from "./ImgItem.module.css";

const ImgItem = ({admin,token, ...heroData }) => {
  // const id = 123123;
  // const [heroData, setHeroData] = useState({
  //   src: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg",
  //   name: "",
  //   description: "",
  // });

  // useEffect(() => {}, [id]);


  // useEffect(() => {
  //   fetch("http://localhost:5000/hero", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => setHeroData(data));
  // }, [heroData.id]);
  

  return (
    <div className={clazz.wrapper}>
      <img className={clazz.img} src={heroData.src} alt={heroData.name}></img>
      <div className={clazz.description_wrapper}>
        <div>{heroData.name}</div>
        <Link to={`/heroPage/${heroData.id}`} className={clazz.link}>
          Details
        </Link>
        {admin === "ADMIN" ? (
          <Link to={`/changeHeroPage/${heroData.id}`} className={`${clazz.button} `}>
            Change
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ImgItem;
