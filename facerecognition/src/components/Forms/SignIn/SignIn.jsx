import "../Forms.css";

/* eslint-disable react/prop-types */
function SignIn({ handleRouteChange }){
    return(
            <form className="form-container">
                    <h1 className="legend center">Sign In</h1>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input className="input" type="email" id="email"/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input className="input" type="password" name="" id="password" />
                    </div>
                <div className="center">
                    <input 
                        onClick={() => handleRouteChange('home')}
                        className="submit-btn input" 
                        type="submit" 
                        value="Submit" 
                    /> 
                </div>
                <div className="center">
                    <p>No account yet? <a className="link" href="#" onClick={() => handleRouteChange('register')}>Register</a></p>
                </div>
            </form>
    )
}

export default SignIn;