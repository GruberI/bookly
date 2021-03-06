import React, { useState, useEffect } from "react";
import axios from "axios";
import MembersList from "./Members/ListMembers";
import AddMeetingForm from "./Meeting/Form/AddMeetingForm";
import MeetingDetails from './Meeting/MeetingDetails';
import EditMeetingForm from "./Meeting/Form/EditMeetingForm";
import CurrentBook from './CurrentBook/CurrentBook';
import AddCurrentBookForm from './CurrentBook/Form/AddCurrentBookForm';
import EditCurrentBookForm from './CurrentBook/Form/EditCurrentBookForm';

import './BookClubDetails.css'

const BookclubDetails = (props) => {
    const [details, setDetails] = useState({});

    const getSingleClub = () => {
        const { id } = props.match.params;
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/bookclub/${id}`, {
            withCredentials: true,
          })
          .then((responseFromApi) => {
           
            setDetails(responseFromApi.data);
          })
          .catch((error) => console.error(error));
          
      };

    useEffect(getSingleClub, [props.match.params]);

    const removeMember = (member) => {
      const editBookClub = {bookclubId: details._id, memberId: member._id}
      axios
      .post(`${process.env.REACT_APP_BASE_URL}/removeMember`, editBookClub)
      .then((response) => {
        console.log(response)
        setDetails(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    return (
        <div className="bc-container">
          <section className="bc-welcome">
            <h1 className="welcome-h1">Welcome to club: {details.name}</h1>
            <p className="welcome-p">Find all your book club details below</p>
          </section>

          <section className="bc-members-date">
            <div className="members-div">
              <h3>Members:</h3>
              <MembersList members={details.members} remove={removeMember}/>
            </div>
            <div className="meeting-div">
              <h3>Next Meeting:</h3>
              <MeetingDetails meeting={details.meeting}/>
              <div className="meeting-form-btns">
                <AddMeetingForm theBookclub={details} getBookClub={getSingleClub}/>
                <EditMeetingForm getBookClub={getSingleClub} theBookclub={details} theMeeting={details.meeting}/>
              </div>
            </div>
          </section>

          <section className="bc-current-book">
          <div>
          <h3>This Months Book:</h3>
          <CurrentBook currentBook={details.currentBook}/>
          </div>
    
            <div className="meeting-form-btns">
            <AddCurrentBookForm getBookClub={getSingleClub} theBookclub={details}/>
            <EditCurrentBookForm theBookclub={details} theCurrentBook={details.currentBook} />
            </div>
          </section>
        </div>
    );
}

export default BookclubDetails;