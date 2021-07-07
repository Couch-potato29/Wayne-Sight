import React ,{useRef, useState, useEffect } from 'react';
//import tensorflow dependencies
//import the webcam dependency
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import '../App.css';
import back from '../Wayne.jpg'

function Detected() {
    const CameraFeed = useRef(null);
    const [isModelLoading, SetIsModelLoading] = useState(false);
    //const canvasRef = useRef(null);
    let text = '-';
    let confidence='-';
    
    var sign;
    var temp = '';
    // Function where the magic happens
    const runModel = async () => {
      SetIsModelLoading(true)
      // Loading the model from github raw file
      let my_model
      try{
        my_model = await tf.loadGraphModel('https://raw.githubusercontent.com/Couch-potato29/Wayne-Sight/master/tfmod-model_with_phrases/model.json')
        SetIsModelLoading(false)
      }
      catch(error){
        console.log(error)
        SetIsModelLoading(false)
      }
      
      // setting the frequency of detecting signs in the video frame
      setInterval(() => {
        detect(my_model);
      }, 16.7);
    };

    if (isModelLoading){
      document.getElementById("de").innerHTML="Model Is Loading";  
    }

    const detect = async (my_model) => {
      // Check if the data is available
      if (
        typeof CameraFeed.current !== "undefined" &&
        CameraFeed.current !== null &&
        CameraFeed.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = CameraFeed.current.video;
        const videoWidth = CameraFeed.current.video.videoWidth;
        const videoHeight = CameraFeed.current.video.videoHeight;
  
        // Set video width
        CameraFeed.current.video.width = videoWidth;
        CameraFeed.current.video.height = videoHeight;
  
        //getting pixel information from the video frame and performing, resize,
        //expansion of dimensions and casting to 32bit integers
        const img = tf.browser.fromPixels(video)
        const resized = tf.image.resizeBilinear(img, [640,480])
        const casted = resized.cast('int32')
        const expanded = casted.expandDims(0)
        const obj = await my_model.executeAsync(expanded)

        //console.log(await obj[7].array())
        
        const boxes = await obj[3].array()
        const classes = await obj[6].array()
        const scores = await obj[7].array()
      

        const labelMap = {
        1:{name:'From', color:'red'},
        2:{name:'Hello', color:'yellow'},
        3:{name:'Learn', color:'lime'},
        4:{name:'My', color:'blue'},
        5:{name:'Name', color:'cyan'},
        6:{name:'Nice', color:'cyan'},
        7:{name:'Sign', color:'cyan'},
        8:{name:'To meet you', color:'cyan'},
        9:{name:'What', color:'cyan'},
        10:{name:'What\'s up', color:'cyan'},
        11:{name:'Where', color:'cyan'},
        12:{name:'You', color:'cyan'},
      }

      function Speak(text, confidence){
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1
        speechSynthesis.speak(utterance)
        document.getElementById("de").innerHTML = text+'-'+confidence
      }

        for(let i=0; i<=boxes.length; i++){
          if(scores[0][i]>=0.75){
            text = classes[0][i]
            sign = labelMap[text]['name']
            //console.log(labelMap[text]['name'])
            confidence = Math.round(scores[0][i]*100)/100
            //document.getElementById("de").innerHTML=labelMap[text]['name'] +'-'+ confidence
          }
        }
        
        if(temp!=sign){
            Speak(sign, confidence)
            temp = sign
        }
        

        tf.dispose(img)
        tf.dispose(resized)
        tf.dispose(casted)
        tf.dispose(expanded)
        tf.dispose(obj)
        
        
      }
    };
    
    useEffect(()=>{runModel()},[]);
    return (
        <div style={{backgroundImage:{back}}}>
            <Webcam
            ref={CameraFeed}
            muted={true} 
            style={{
                //position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "30px",
                paddingBottom: "0px",
                left: 0,
                right: 0,
                textAlign: "center",
                //zindex: 9,
                width: 640,
                height: 480,
                overflow : 'hidden',
                borderRadius : "50px",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            />
            <h1 id="de" className="detect-style"></h1>
        </div>
    )
}

export default Detected