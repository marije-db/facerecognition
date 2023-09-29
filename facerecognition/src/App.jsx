import { useCallback, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageUrlForm from "./components/ImageUrlForm/ImageUrlForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/Forms/SignIn/SignIn";
import Register from "./components/Forms/Register/Register";
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
  const [btnPressed, setBtnPressed] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState("signin")
  // const [signedIn, setSignedIn] = useState(false)
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);


  function calculateFaceBox(data){
    console.log(data)
    const regions = data.outputs[0].data.regions;
    // console.log(" regions, => ", regions)
    const img = document.getElementById('img');
    const width = img.width;
    const height = img.height;


    const allFaces = regions.map(region => {
      let regionInfo = region.region_info.bounding_box
      return {
          leftCol: regionInfo.left_col * width,
          rightCol: width - (regionInfo.right_col * width),
          topRow: regionInfo.top_row * height,
          bottomRow: height - (regionInfo.bottom_row * height)
        }
    })

    setBoxes(allFaces)
  }  
    
  function onInputChange(e){
    setBtnPressed(false)
    setImage(e.target.value)
  }
  
  function onButtonSubmit(){
    if(image){
      setBtnPressed(true)
    }
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", clarifaiRequestOptions(image))
        .then(response => response.json())
        .then(result => {
          calculateFaceBox(result);
        })
        .catch(error => console.log('error', error));
  }

  function handleRouteChange(route){
    // if (route === 'home') {
    //   setSignedIn(true)
    // }
    setRoute(route)
  }
  

  return (
    <>
    <Particles
            id="tsparticles"
            init={particlesInit}
            options={particleOptions}
        />
      <Navigation 
        handleRouteChange={handleRouteChange} 
        route={route}
      />
      {route === 'signin'
        ?
         <SignIn handleRouteChange={handleRouteChange} />
        :
        route === 'register' 
          ?
            <Register handleRouteChange={handleRouteChange} /> 
          :
            <div>
              <Logo />
              <Rank />
              <ImageUrlForm 
                onInputChange={onInputChange} 
                onButtonSubmit={onButtonSubmit} 
              />
              <FaceRecognition 
                image={image} 
                showImage={btnPressed} 
                boxes={boxes}
              />
            </div>
      }
    </>
  )
}

export default App
