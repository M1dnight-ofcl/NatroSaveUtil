import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList } from '@fortawesome/free-solid-svg-icons'
import "./style/App.css";
import { eel } from "./eel.js";

const App = (prop) => {
  eel.set_host("ws://localhost:8888");
  // eel.hello(); // test

  const [status,setStatus]=useState('Home');
  useEffect(()=>{document.title=`NatroSaveUtil - ${status}`;});
  useEffect(()=>{document.getElementById('sb-home').click()},[]);

  const SideBarIcon = (prop) => {
    const onClick = (e) => {
      e.preventDefault();
      let items=document.querySelectorAll('.item'); 
      for (let i=0;i<items.length;i++) {
        items[i].classList.remove('active')};
      e.target.classList.add("active");
      let content=document.querySelectorAll('.content'); 
      for (let i=0;i<content.length;i++) {
        content[i].style.display="none"};
      if (document.getElementById(prop.opens)) document.getElementById(prop.opens).style.display="block";
    }
    return (
      <span className="item" onClick={(e)=>onClick(e)} id={prop.id}>
        <FontAwesomeIcon style={{"paddingRight":5}} icon={prop.icon}/>
        {prop.txt}</span>
    )
  }

  const Home=()=>{
    const Backup=(e)=>{
      e.preventDefault();
      eel.saveSettings();
    }
    return (
      <div id="home" className="content">
        <h1>Welcome To NatroSaveUtil</h1>
        <button id="savebtn-home" onClick={(e)=>Backup(e)}>Backup Settings</button>
      </div>
    )
  }

  return(
    <div className="App">
        <div id="sidebar">
          <div id="cont">
            <SideBarIcon txt="Home" icon={faHome} id="sb-home" opens="home" />
            <SideBarIcon txt="View All Backups" icon={faList} id="sb-view" opens="view" />
            <p id="info">M1dnight © 2024 - v0.1 dev</p>
          </div>
          <div id="content">
            <Home/>
          </div>
        </div>
    </div>
  )
}

export default App;
