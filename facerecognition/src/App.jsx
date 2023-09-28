import { useCallback, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageUrlForm from "./components/ImageUrlForm/ImageUrlForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './App.css';

const particleOptions = {
  particles: {
      links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
      },
      move: {
          direction: "none",
          enable: true,
          outModes: {
              default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
      },
      number: {
          density: {
              enable: true,
              area: 200,
          },
          value: 30,
      },
      shape: {
          type: "",
      },
      size: {
          value: { min: 1, max: 4 },
      },
  }
}

const clarifaiRequestOptions = (imgUrl) => {
  const PAT = 'c57ff8c9ac8a4328a4a27ff183f18b43';
  const USER_ID = 'a0tlik13b3gs';       
  const APP_ID = 'face-detection-app_32730_React';
  const IMAGE_URL = imgUrl;
  
  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    })
    
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  }

  return requestOptions
}

function App() {
  const [image, setImage] = useState("")
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);
  
    
  function onInputChange(e){
    setImage(e.target.value)
  }

  function onButtonSubmit(){
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", clarifaiRequestOptions(image))
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  return (
    <>
    <Particles
            id="tsparticles"
            init={particlesInit}
            options={particleOptions}
        />
      <Navigation />
      <Logo />
      <Rank />
      <ImageUrlForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition image={image} />
    </>
  )
}

export default App
