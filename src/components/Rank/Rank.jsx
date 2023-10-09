import "./Rank.css"

/* eslint-disable react/prop-types */
function Rank({ name, entries }) {
    return(
        <>
            <div className="rank-container">
                <p>Hi {name}, your current entry count is: </p>
                <p>{entries}</p>
            </div>
        </>
    )
}

export default Rank;