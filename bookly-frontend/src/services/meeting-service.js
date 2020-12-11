import axios from "axios";

class MeetingService {
  constructor() {
    this.service = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true
    });
  }

  // Create new meeting
  createMeeting = (data) => {
    return this.service.post("/meeting", data).then((response) => response);
  };

  //Method to update meeting
  updateMeeting = (data) => {
    return this.service.post("/updateMeeting", data).then((response) => response);
  };

}

export default MeetingService;