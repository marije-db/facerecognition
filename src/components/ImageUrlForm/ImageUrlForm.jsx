import "./ImageUrlForm.css"
/* eslint-disable react/prop-types */
function ImageUrlForm({onInputChange, onButtonSubmit}) {
    return(
        <>
        <div className="form-field">
            <input 
                className="inputfield" 
                type="text" 
                placeholder="Link to image here please..."
                onChange={onInputChange}
            />
            <button 
                className="detect-btn"
                onClick={onButtonSubmit}
            >Detect</button>
        </div>
        </>
    )
}

export default ImageUrlForm;