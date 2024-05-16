// src/App.js


import React from 'react';
import './App.css';
import Main from './components/Main/Main'; 
// import firebase from './Firebase';
// import { useState, useEffect } from 'react';

function App() {

  // const ref = firebase.firestore().collection("developers")
  // console.log(ref);

  // const[data, setdata] = useState([])
  // const[loader, setloader] = useState(true)

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
