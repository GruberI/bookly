import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import './CreateClub.css';

const initialState = {name: "", password: ""};

const CreateClub = (props) => {
    const [clubState, setClubState] = useState(initialState);
    const [loggedInUser, setLoggedInUser] = useState(null)
    const { getUser } = props

    useEffect(() => {
        setLoggedInUser(props.loggedInUser)
        }, [props.loggedInUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setClubState({...clubState, [name]: value });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const {name, password} = clubState
        const userId = loggedInUser._id
        
        axios
        .post(
            `${process.env.REACT_APP_BASE_URL}/create`,
            { name, password, userId },
            { withCredentials: true }
        )
        .then((response) => {
            getUser(response.data)
            props.history.push(`/userprofile`)
        })
        .catch((error) => console.error(error))
    }

    return (
        <div className="authFormDivLoggedIn createDiv ">
            <h1>Lets Create A Book Club!</h1>
            <hr/>
            <form onSubmit={handleFormSubmit} className="loginDiv">
                <div className="item-edit-div">
                    <label htmlFor="name" className="label1">Book Club Name:</label>
                    <br/>
                    <input type="text" name="name" value={clubState.name} onChange={handleInputChange} placeholder="ex. My Wine Club Has a Book Problem..."/>
                </div>
              
                <button type="submit" className="createBtn">Create</button>
            </form>
        </div>
    );
}

export default withRouter(CreateClub);