import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import './CreateClub.css';

const initialState = {_id: "", userId: ""};

const JoinClub = (props) => {
    const [clubState, setClubState] = useState(initialState);
    const userId = props.loggedInUser._id
    const { getUser } = props

    const handleInputChange = (event) => {
        setClubState({
            _id : event.target.value, 
            userId 
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const {_id, userId} = clubState

        axios
        .post(
            "http://localhost:5000/join",
            { _id, userId },
            { withCredentials: true }
        )
        .then((response) => {
            getUser(response.data)
            props.history.push(`/userprofile`)
        })
        .catch((error) => console.error(error))
    }

    return (
        <div className="authFormDivLoggedIn createDiv">
        <h1>Join A Club!</h1>
        <hr/>
        <form onSubmit={handleFormSubmit} className="loginDiv">
        
            <div className="item-edit-div">
                <label htmlFor="id" className="label1">Book Club ID:</label>
                <br/>
                <input type="text" name="_id" value={clubState._id} onChange={handleInputChange} placeholder="Request from club admin..."/>
            </div>
                   
            <button type="submit" className="createBtn">Join</button>
        </form>
    </div>
    )
}

export default withRouter(JoinClub);