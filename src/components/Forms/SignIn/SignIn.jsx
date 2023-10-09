import { useState } from "react";
import "../Forms.css";

/* eslint-disable react/prop-types */
function SignIn({ handleRouteChange, loadUser }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function emailChange(event){
        event.preventDefault()
        setEmail(event.target.value)
    }
    
    function passwordChange(event){
        event.preventDefault()
        setPassword(event.target.value)
    }
    
    function onSubmit(event){
        event.preventDefault()
        fetch('https://backend-wzkj.onrender.com/signin', {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                loadUser(user)
                handleRouteChange('home')
            }
        })
    }

    return(
            <form className="form-container">
                    <h1 className="legend center">Sign In</h1>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={emailChange}
                            className="input" 
                            type="email" 
                            id="email" 
                            autoComplete="username"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={passwordChange}
                            className="input" 
                            type="password" 
                            name="" 
                            id="password" 
                            autoComplete="current-password" 
                        />
                    </div>
                <div className="center">
                    <input 
                        onClick={onSubmit}
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