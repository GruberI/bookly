import React, { useState }  from "react";
import { Link } from "react-router-dom";
import './CreateClub.css';
import { withRouter } from "react-router-dom";

import AuthService from "../../services/auth-service";

const initialState = { username: "", password: "" };

const Login = (props) => {
    const [loginState, setLoginState] = useState(initialState);
    const [loginErrorMsg, setLoginErrorMsg] = useState("");   

    const service = new AuthService();

    const handleFormSubmit = (event) => {
        event.preventDefault();
    
        const { username, password } = loginState;
    
        service
          .login(username, password)
          .then((response) => {
            props.getUser(response);
            props.history.push('/userprofile')
          })
          .catch((error) => {
              console.log(error)
            const message = "error upon login";
            setLoginErrorMsg(message);
            console.log(error);
          });
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginState({ ...loginState, [name]: value });
    };

    return (
        <div className="authFormDivLoggedIn">
            <h1>Login to Your Account</h1>
            <hr/>
            <form onSubmit={handleFormSubmit} className="loginDiv">
                <div className="item-edit-div">
                    <label htmlFor="username" className="label1">Name:</label>
                    <br/>
                    <input type="text" name="username" value={loginState.username} onChange={handleChange}/>
                </div>
                
                <div className="item-edit-div">
                    <label htmlFor="password" className="label1">Password:</label>
                    <br/>
                    <input type="password" name="password" value={loginState.password} onChange={handleChange}/>
                </div>
                       
                <button className="createBtn">Lets Go!</button>
                
            </form>
            <br/>
            {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}

            <p> Don't have account?
                <Link to={"/signup"}> Signup</Link>
            </p>
        </div>
    );
}

export default withRouter(Login);