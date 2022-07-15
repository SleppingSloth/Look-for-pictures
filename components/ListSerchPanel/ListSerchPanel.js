import React, {useState} from "react";

import clazz from "./ListSerchPanel.module.css";
const ListSerchPanel = ({setSerch}) => {
  const [serchInput, setSerchInput] = useState("")
  const onChengeSerch = (e) => {
    setSerch(e.target.value);
    setSerchInput(e.target.value);
  }

  return (
    <div className={clazz.wrapper}>
      <div className={clazz.input_wrapper}>
        <div className={clazz.title}>Serch by name:</div>
        <input className={clazz.input} value={serchInput} onChange={onChengeSerch}/>
      </div>
      {/* <div className={clazz.filter_wrapper}>
        <button className={`${clazz.filter} ${clazz.active}`}>All</button>
        <button className={clazz.filter}>New hero</button>
      </div> */}
    </div>
  );
};

export default ListSerchPanel;
