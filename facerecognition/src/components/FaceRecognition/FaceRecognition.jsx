import "./FaceRecognition.css"

/* eslint-disable react/prop-types */
function FaceRecognition({image, showImage}){
    return(
        <>
            {showImage 
            ? 
            <div className="image-container">
                <img src={image} alt="" />
            </div> 
            : 
            <div></div> 
            }
        </>
    )
}

export default FaceRecognition;