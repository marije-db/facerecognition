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

function App() {
  const [image, setImage] = useState("")
  const [btnPressed, setBtnPressed] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState("signin")
  const [user, setUser] = useState({
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
  })
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  function loadUser(user){
    setUser( {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    })
  }

  function calculateFaceBox(data){
    const regions = data.outputs[0].data.regions;
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
  
  function onImageSubmit(){
    if(image){
      setBtnPressed(true)
    }
    fetch("https://backend-wzkj.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: image,
      }),
    })
    .then((response) => {
      if (response.status === 500) {
        throw new Error(
        "Whoops! Sorry, we are currently unable to connect to the API."
        );
      }
      return response.json();
    })
    .then(response => {
      if(response) {
        fetch('https://backend-wzkj.onrender.com/image', {
          method: "put",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({
              id: user.id,
          })
        })
        .then(response => response.json())
        .then(count => setUser({
          ...user,
          entries : count
        }))
        .catch(console.log)
      }
        calculateFaceBox(JSON.parse(response))
      })
    .catch(error => console.log('error', error));

  }

  function handleRouteChange(route){
    if(route === 'signin'){
      setImage('')
      setBtnPressed(false)
      setBoxes([])
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      })
    }
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
         <SignIn loadUser={loadUser} handleRouteChange={handleRouteChange} />
        :
        route === 'register' 
          ?
            <Register loadUser={loadUser} handleRouteChange={handleRouteChange} /> 
          :
            <div>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageUrlForm 
                onInputChange={onInputChange} 
                onButtonSubmit={onImageSubmit} 
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
