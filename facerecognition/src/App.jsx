import { useCallback } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageUrlForm from "./components/ImageUrlForm/ImageUrlForm";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './App.css';

const particleOptions = {
  fpsLimit: 120,
  interactivity: {
      modes: {
          push: {
              quantity: 4,
          },
          repulse: {
              distance: 200,
              duration: 0.4,
          },
      },
  },
  particles: {
      color: {
          value: "#ffffff",
      },
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
              area: 900,
          },
          value: 100,
      },
      shape: {
          type: "none",
      },
      size: {
          value: { min: 1, max: 4 },
      },
  },
  detectRetina: true
}

function App() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
}, []);

  return (
    <>
    <Particles
            id="tsparticles"
            init={particlesInit}
            options={particleOptions}
        />
      <Navigation />
      <Logo />
      <ImageUrlForm />
    </>
  )
}

export default App
