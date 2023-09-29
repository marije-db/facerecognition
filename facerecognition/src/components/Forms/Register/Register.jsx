import "../Forms.css";

/* eslint-disable react/prop-types */
function Register({ handleRouteChange }){
    return(
            <form className="form-container">
                <fieldset>
                    <legend className="legend center">Register</legend>
                    <div className="input-container">
                        <label htmlFor="name">Name</label>
                        <input className="input" type="text" id="name"/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input className="input" type="email" id="email"/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input className="input" type="password" name="" id="password" />
                    </div>
                </fieldset>
                <div className="center">
                    <input 
                        onClick={() => handleRouteChange('home')}
                        className="submit-btn input" 
                        type="submit" 
                        value="submit" 
                    /> 
                </div>
                <div className="center">
                    <p>Already signed up? <a className="link" href="#" onClick={() => handleRouteChange('signin')}>Sign In</a></p>
                </div>
            </form>
    )
}

export default Register;