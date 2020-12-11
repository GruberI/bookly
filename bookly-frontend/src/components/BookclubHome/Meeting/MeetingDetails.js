import React from "react";
import './Meeting.css'

const MeetingDetails = (props) => {

    return(
        <div className="meeting-details-div">
            <div className="meeting-details-text">
                <p>Date:</p>
                <p>Time:</p>
                <p>Link:</p>
            </div>
            
           { props && props.meeting ? 
            <ul key={props.meeting._id} className="meeting-ul">
                        <li>{props.meeting.date}</li>
                        <li>{props.meeting.time}</li>
                        <li>{props.meeting.link}</li>
                    </ul>: ""} 
            
        </div>
    );
}

export default MeetingDetails;