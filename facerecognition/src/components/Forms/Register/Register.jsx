import { useState } from "react";
import "../Forms.css";

/* eslint-disable react/prop-types */
function Register({ handleRouteChange, loadUser }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    function emailChange(event){
        setEmail(event.target.value)
    }
    
    function passwordChange(event){
        setPassword(event.target.value)
    }
    
    function nameChange(event){
        setName(event.target.value)
    }
    
    function onSubmit(event){
        event.preventDefault()
        fetch('http://localhost:3000/register', {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                loadUser(user)
                handleRouteChange('home')
            }
        })
    }
    return(
            <form className="form-container">
                    <h1 className="legend center">Register</h1>
                    <div className="input-container">
                        <label htmlFor="name">Name</label>
                        <input 
                            onChange={nameChange}
                            className="input" 
                            type="text" 
                            id="name"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={emailChange}
                            className="input" 
                            type="email" 
                            id="email" 
                            autoComplete="usernamen"
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
                            autoComplete="new-password"
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
                    <p>Already signed up? <a className="link" href="#" onClick={() => handleRouteChange('signin')}>Sign In</a></p>
                </div>
            </form>
    )
}

export default Register;