import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList, faPen ,faTrash } from '@fortawesome/free-solid-svg-icons'
import "./style/App.css";
import { eel } from "./eel.js";

const App = (prop) => {
  eel.set_host("ws://localhost:8888");
  // eel.hello(); // test
  const[advStatus,setAdvStatus]=useState('idle');
  const[status,setStatus]=useState('Home');
  useEffect(()=>{document.title=`NatroSaveUtil - ${status}`;});
  useEffect(()=>{document.getElementById('sb-home').click()},[]);
  const setGlobalStatus=(ts,as)=>{setAdvStatus(as);setStatus(ts);}
  const resetStatus=()=>setGlobalStatus('Home','idle');
  //sidebar option
  const SideBarIcon = (prop) => {
    const onClick = (e) => {
      e.preventDefault();
      let items=document.querySelectorAll('.item'); 
      for (let i=0;i<items.length;i++) {
        items[i].classList.remove('active')};
      // if(!e.target.classList.contains('icon'))e.target.classList.add("active");
      /*else*/document.getElementById(prop.id).classList.add("active");
      let content=document.querySelectorAll('.content'); 
      for (let i=0;i<content.length;i++) {
        content[i].style.display="none";/*console.log(`hiding ${content[i].id}`)*/};
      if(document.getElementById(prop.opens)){
        document.getElementById(prop.opens).style.display="block";
        /*console.log(`showing ${document.getElementById(prop.opens).id}`);*/}
      else console.error('object not found err');
    }
    return (
      <span className="item" onClick={(e)=>onClick(e)} id={prop.id}>
        <FontAwesomeIcon style={{"paddingRight":5}} icon={prop.icon} className="item icon" />
        {prop.txt}</span>
    )
  }

  const CustomAlert=(prop)=>{
    const actions = {
      "open":() => {
        console.log('opening...');
        document.getElementById(prop.id).style.opacity="1";
      },
      "close":() => {
        console.log('closing...');
        document.getElementById(prop.id).style.opacity="0";
      }
    }
    return(
      <div className="c_alert" id={prop.id}>
        <h1>{prop.title}</h1>
        <p>{prop.children}</p>
        <div className="buttonWrapper">
          {prop.buttons.map((data)=>
          <button key={data.id} id={data.id} onClick={
            (e)=>{
              e.preventDefault();
              if(data.action)actions[data.action]();
              else if(data.c_action)data.c_action();
            }}>{data.text}</button>)}
        </div>
      </div>
    )
  }
  
  const Home=()=>{
    const Backup=(e)=>{
      e.preventDefault();
      setGlobalStatus('Backing Up...','backup in progress...')
      eel.saveSettings();
      resetStatus()
    }
    return (
      <div id="home" className="content">
        <h1 id="cH_t">Welcome To NatroSaveUtil</h1>
        <button id="savebtn-home" onClick={(e)=>Backup(e)}>Backup Settings</button>
      </div>
    )
  }
  const View=()=>{
    const [txt,setTxt]=useState('undefined');
    const Hover=(prop)=>{
      return(
        <div className="hovertip" id="hovertip">
          <p>{txt}</p>
        </div>
      )
    }
    const gotocursor=(e,txt)=>{
      setTxt(txt);
      document.getElementById("hovertip").style.left=`${e.pageX+10}px`;
      document.getElementById("hovertip").style.top=`${e.pageY+5}px`;
    }
    const Edit=(e)=>{
      e.preventDefault();
      console.log('editing...');
    },Delete=(e)=>{
      e.preventDefault();
      console.log('deleting...');
    }
    const Item=(prop)=>{
      return(
        <div className="item" id={prop.id} 
          onMouseMove={(e)=>gotocursor(e,"Hello")}
          onMouseEnter={(e)=>{document.getElementById("hovertip").style.display="block";}}
          onMouseLeave={(e)=>{document.getElementById("hovertip").style.display="none";}}>
          <span className="name">{prop.name}</span>
          <div className="iconlist">
            <FontAwesomeIcon icon={faPen} className="icon" onClick={(e)=>Edit(e)} />
            <FontAwesomeIcon icon={faTrash} className="icon" onClick={(e)=>Delete(e)} />
          </div>
        </div>
      )
    }
    //? TO WORK ON:
    //? console.log(eel.getDir()().then(async(dat)=>{return(await dat)}));
    return(
      <div id="view" className="content">
        <Hover/>
        <h1 id="CVab_t">All Saves</h1>
        <div id="savelist">
          {/* <Item name="Test" id="testicon" /> test */}
        </div>
      </div>
    )
  }
  return(
    <div className="App">

      {/* 
      <CustomAlert title="This is a Work in Progress!" id="info-nonexistant" buttons={[{
          "action":"close",
          "id":"closebtn-ine",
          "text":"Okay"
        }]}>
        This page isn't ready yet; But you can still look around. The code isn'target
        the best, so please create a GitHub issue.
      </CustomAlert> 
      */}

      <div id="sidebar">
        <div id="cont">
          <SideBarIcon txt="Home" icon={faHome} id="sb-home" opens="home" />
          <SideBarIcon txt="View All Backups" icon={faList} id="sb-view" opens="view" />
          <p id="info">M1dnight © 2024 - v0.1 dev</p>
        </div>
      </div>

      <div id="content">
        <Home/>
        <View/>
        <div id="statusbar">
          <span id="status">{advStatus}</span>
        </div>
      </div>

    </div>
  )
}

export default App;
