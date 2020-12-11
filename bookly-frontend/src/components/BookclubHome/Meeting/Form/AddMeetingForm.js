import React, {useState} from 'react';
import '../Meeting.css'

import MeetingService from '../../../../services/meeting-service';

const initialState = { date: "", time: "", link: "", isShowing: false, };

const AddMeetingForm = (props) => {
    const [addFormState, setAddFormState] = useState(initialState);

    // Function handler for input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddFormState({ ...addFormState, [name]: value });
  };

  const handleFormSubmit = (event) => {
      event.preventDefault();

      const { date, time, link } = addFormState;
      const bookClubId = props.theBookclub._id

      const service = new MeetingService();

      service
        .createMeeting({
            date,
            time,
            link,
            bookClubId
        })
        .then(() => {
            props.getBookClub()
            setAddFormState(initialState)
        })
        .catch((error) => console.error(error));
  }

  // function handler to toggle the form
  const toggleForm = () =>
    !addFormState.isShowing
      ? setAddFormState({ ...addFormState, isShowing: true })
      : setAddFormState({ ...addFormState, isShowing: false });

    return(
        <div className="edit-form-div">
            <button onClick={()=> toggleForm()} className="add-meeting-btn">Add Meeting</button>
            <div>
            {addFormState.isShowing && (
                <div>
                    <form onSubmit={handleFormSubmit}>
                    <div className="form-inputs">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={addFormState.date}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-inputs">
                        <label htmlFor="time">Time:</label>
                        <input
                            type="time"
                            name="time"
                            value={addFormState.time}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-inputs">
                        <label htmlFor="link">Zoom or Google link:</label>
                        <input
                            type="text"
                            name="link"
                            value={addFormState.link}
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

export default AddMeetingForm;