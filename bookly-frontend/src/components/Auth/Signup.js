import React, { useState }  from "react";
import './CreateClub.css';

import { Link } from "react-router-dom";
import AuthService from "../../services/auth-service";
import { withRouter, useHistory } from "react-router-dom";

const initialState = { username: "", password: "" };

const Signup = (props) => {
    const [signupForm, setSignupForm] = useState(initialState);
    const [signupErrorMsg, setSignupErrorMsg] = useState(""); 

    const service = new AuthService();
    const history = useHistory()

    const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password } = signupForm;
    console.log("FROM REACT", username, password)

    service
      .signup(username, password)
      .then((response) => {
        props.getUser(response);
        history.push('/userprofile')
      })
      .catch((error) => {
        const message = "error upon signup";
        setSignupErrorMsg(message);
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

    return (
        <div className="authFormDivLoggedIn">
            <h1>Sign up to get started!</h1>
            <hr/>
            <form onSubmit={handleFormSubmit} className="loginDiv">
                <div className="item-edit-div">
                    <label htmlFor="username" className="label1">Name:</label>
                    <br/>
                    <input type="text" name="username" value={signupForm.username} onChange={handleChange}/>
                </div>
                
                <div className="item-edit-div">
                    <label htmlFor="password" className="label1">Password:</label>
                    <br/>
                    <input type="password" name="password" value={signupForm.password} onChange={handleChange}/>
                </div>
                
                <button type="submit" className="createBtn">Sign Up!</button>
                
            </form>
            <br/>
            {signupErrorMsg && <span style={{ color: "red" }}>{signupErrorMsg}</span>}

            <p>
                Already have an account?
                <Link to={"/"}> Login</Link>
            </p>
        </div>
    );
}

export default withRouter(Signup);