import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

import AuthService from "../../services/auth-service";

const Navbar = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const service = new AuthService();

    // Mimic lifecycle method when a component updates
  useEffect(() => {
    setLoggedInUser(props.userInSession);
    }, [props.userInSession]);

    // function to log user out
  const logoutUser = () => {
    service.logout().then(() => {
      // reset state value
      setLoggedInUser(null);

      // reset getUser value
      props.getUser(null);
        });
    };

    if (loggedInUser) {
        return (
            <nav className="loggedInNav">
                <div>    
                    <Link to="/">
                        <p onClick={logoutUser} className="loggedInNavP">Log Out</p>
                    </Link>   
                    <Link to="/create">
                        <p className="loggedInNavP">Create A Book Club</p>
                    </Link>
                    <Link to="/userprofile">
                        <p className="loggedInNavP">Profile</p>
                    </Link>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <div className="button-div">
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
                <Link to="/login">
                    <button className="pTwo">Login</button>
                </Link>   
                <Link to="/">
                    <button>Home</button>
                </Link>
                </div>
            </nav>
        );
    }
}

export default Navbar;