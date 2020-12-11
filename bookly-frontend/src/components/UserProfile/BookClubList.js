import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './UserProfile.css'


const BookClubList = (props) => {
    const [listOfBookClubs, setListOfBookClubs] = useState([]);

    const { user } = props

    const getAllBookClubs = () => {
       
        axios
        .get(`${process.env.REACT_APP_BASE_URL}/userprofile/${user._id}`, { withCredentials: true })
        .then((responseFromApi) => {
            setListOfBookClubs(responseFromApi.data.bookclubs);
        })
        .catch((error) => console.error(error))
    }

    useEffect(getAllBookClubs, []);

    return user.bookclubs.length === 0 ? (
        <p>You are not part of a club</p>
    ) : (
        <div className="list-first-div">
        {listOfBookClubs.map((bookclub) => {
          return (

        <div key={bookclub._id} className="list-second-div">
            <div>
                <Link to={`/bookclub/${bookclub._id}`}>
                    <h3>{bookclub.name}</h3>    
                </Link>
                <p>Send this code so other members can join: <strong>{bookclub._id}</strong></p>
            </div>
        </div>
        )
        })}
        </div>)

}

export default BookClubList;