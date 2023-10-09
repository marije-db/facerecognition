import "./FaceRecognition.css"

/* eslint-disable react/prop-types */
function FaceRecognition({image, showImage, boxes}){
    return(
        <>
            {showImage 
            ? 
            <div className="image-container">
                <img id="img" src={image} alt="" />
                {boxes.map((box, index) => {
                    return <div 
                        key={index} 
                        className="face-box"
                        style={{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol}}
                        ></div>
                })}
            </div> 
            : 
            <div></div> 
            }
        </>
    )
}

export default FaceRecognition;