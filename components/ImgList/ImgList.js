import React, { useState, useEffect, useCallback } from "react";

import ImgItem from "../ImgItem";
import ListSerchPanel from "../ListSerchPanel";
import Spiner from "../Spiner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import clazz from "./Imglist.module.css";

import { useHttp } from "../Hooks/Hooks";

const ImgList = ({ admin, token, listHero, newHero }) => {
  const [serch, setSerch] = useState("");

  useEffect(() => {
    listHero();
  }, []);

  const CreateHerosList = useCallback((data) => {
    return data.map((hero) => {
      return (
        <ImgItem
          admin={admin}
          name={hero.name}
          key={hero._id}
          src={hero.img}
          id={hero._id}
          token={token}
        />
      );
    });
  });

  const filterData = (heros) => {
    return heros.filter((hero) => {
      return hero.name.toUpperCase().indexOf(serch.toUpperCase()) !== -1;
    });
  };

  const content = CreateHerosList(filterData(newHero));

  return (
    <div>
      {/* <Spiner/>
        <ErrorMessage/> */}
      <ListSerchPanel setSerch={setSerch} />
      <div className={clazz.wrapper}>
        {content.length !== 0 ? (
          content
        ) : (
          <div className={clazz.title}>The list of heroes is empty</div>
        )}
      </div>
    </div>
  );
};

export default ImgList;
