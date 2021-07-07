// Import dependencies
import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";
import "./App.css";
import Detected from './Components/Detected';
import Header from './Components/Header';
import { model, nextFrame, Sign } from "@tensorflow/tfjs";
//Import drawing from uitilities to draw a rectangle
//import {drawRect} from "./utilities"; 

function App() {

  return (
    <div className="App">
      <Header />
      <Detected />
    </div>
  );
}

export default App;
