import React from 'react'
import './UserProfile.css'
import BookClubList from "./BookClubList"

import { Link } from "react-router-dom";


const UserProfile = (props) => {
    const { loggedInUser } = props

    return(
        <div className="authFormDivLoggedIn user-profile-container">
            <h1 className="userH1">Welcome {loggedInUser.username}</h1>
            <Link to="/create">
                <button className="userBtn Btn1">Create A Book Club</button>
            </Link>
            
            <Link to="/join">
                <button className="userBtn">Join a Book Club</button>
            </Link>

            <hr/>
            <h1 className="userH1 listH1">Your Book Clubs</h1>
            <BookClubList user={loggedInUser}/>
        </div>
    );
}

export default UserProfile;