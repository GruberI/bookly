import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './UserProfile.css'


const BookClubList = (props) => {
    const [listOfBookClubs, setListOfBookClubs] = useState([]);

    const { user } = props

    const getAllBookClubs = () => {
       
        axios
        .get(`http://localhost:5000/userprofile/${user._id}`, { withCredentials: true })
        .then((responseFromApi) => {
            setListOfBookClubs(responseFromApi.data.bookclubs);
        })
        .catch((error) => console.error(error))
    }

    useEffect(getAllBookClubs, []);

    // function to "delete"/but really update a bookclub
//   const deleteMemberFromClub = () => {
//     axios
//       .get(`http://localhost:5000/bookclub/${user._id}`, {
//         withCredentials: true,
//       })
//       .then((results) => {
//         props.history.push("/userprofile");
//       })
//       .catch((error) => console.error(error));
//   };

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
                {/* <button onClick={() => deleteBookClub(bookclub._id)}>Delete</button> */}
            </div>
        </div>
        )
        })}
        </div>)

}

export default BookClubList;