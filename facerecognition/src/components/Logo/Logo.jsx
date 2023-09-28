import Tilt from 'react-parallax-tilt';
import logo from './logo.png'
import "./Logo.css"

function Logo() {

    return(
        <>
            <Tilt className='tilt-main' gyroscope={true} tiltMaxAngleX={45} tiltMaxAngleY={45}>
                <div className='tilt'>
                    <img src={logo} alt="logo" />
                </div>
            </Tilt>
        </>
    )
}

export default Logo;