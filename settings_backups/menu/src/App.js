import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList } from '@fortawesome/free-solid-svg-icons'
import "./style/App.css";

import { eel } from "./eel.js";
const App = (prop) => {
  eel.set_host("ws://localhost:8888");
  // eel.hello(); // test

  const [status,setStatus]=useState('Home');
  useEffect(()=>{document.title=`NatroSaveUtil - ${status}`;})

  const SideBarIcon = (prop) => {
    const onClick = (e) => {
      e.preventDefault();
      let items=document.querySelectorAll('.item'); 
      for (let i=0;i<items.length;i++) {
        items[i].classList.remove('active')};
      e.target.classList.add("active");
    }
    return (
      <span className="item" onClick={(e)=>onClick(e)}>
        <FontAwesomeIcon style={{"paddingRight":5}} icon={prop.icon}/>
        {prop.txt}</span>
    )
  }

  return(
    <div className="App">
        <div id="sidebar">
          <div id="cont">
            <SideBarIcon txt="Home" icon={faHome} />
            <SideBarIcon txt="View All Backups" icon={faList} />
            <p id="info">M1dnight © 2024 - v0.1 dev</p>
          </div>
        </div>
    </div>
  )
}

export default App;
