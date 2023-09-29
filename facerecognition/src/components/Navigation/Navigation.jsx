import "./Navigation.css"

/* eslint-disable react/prop-types */
function Navigation({ handleRouteChange, route }) {
    return(
            route === "home" 
                ?
                    <nav className="nav">
                        <p onClick={() => handleRouteChange('signin')}>Sign Out</p>
                    </nav>
                :
                    route === "signin"
                        ?
                            <nav className="nav">
                                <p onClick={() => handleRouteChange('register')}>Register</p>
                            </nav>
                        : 
                            <nav className="nav">
                                <p onClick={() => handleRouteChange('signin')}>Sign in</p>
                            </nav>

    )
}

export default Navigation;