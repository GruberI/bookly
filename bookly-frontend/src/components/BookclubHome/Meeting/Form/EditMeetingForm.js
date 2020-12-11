import React, {useState} from 'react';
import '../Meeting.css'

import MeetingService from '../../../../services/meeting-service';

const initialState = { date: "", time: "", link: "", isShowing: false, };

const EditMeetingForm = (props) => {
    const [editFormState, setEditFormState] = useState(initialState);
    console.log("props theMeeting is:")
    console.log(props.theMeeting)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormState({ ...editFormState, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { date, time, link } = editFormState;
    const bookClubId = props.theBookclub._id
    const meetingId = props.theMeeting._id
    console.log("meetingId:")
    console.log(meetingId)
    const service = new MeetingService();

    service
        .updateMeeting({
            date,
            time,
            link,
            bookClubId,
            meetingId
        })
        .then(() => {
            props.getBookClub()
            editFormState(initialState);
        })
        .catch((error) => console.error(error));
  }

  const toggleForm = () =>
    !editFormState.isShowing
      ? setEditFormState({ ...editFormState, isShowing: true })
      : setEditFormState({ ...editFormState, isShowing: false });

    return (
        <div className="edit-form-div">
            <button onClick={()=> toggleForm()} className="add-meeting-btn update-btn">Update Meeting</button>
        <div>
            {editFormState.isShowing && (
                <div>
                    <form onSubmit={handleFormSubmit}>
                    <div className="form-inputs">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={editFormState.date}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-inputs">
                        <label htmlFor="time">Time:</label>
                        <input
                            type="time"
                            name="time"
                            value={editFormState.time}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-inputs">
                        <label htmlFor="link">Zoom or Google link:</label>
                        <input
                            type="text"
                            name="link"
                            value={editFormState.link}
                            onChange={handleInputChange}
                        />
                    </div>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )}
            </div>
        </div>
    );
}

export default EditMeetingForm;