import "./FaceRecognition.css"

/* eslint-disable react/prop-types */
function FaceRecognition({image}){
    return(
        <>
            <div className="image-container">
                <img src={image} alt="" />
            </div>
        </>
    )
}

export default FaceRecognition;