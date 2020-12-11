import axios from "axios";

class MeetingService {
  constructor() {
    this.service = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true
    });
  }

  createMeeting = (data) => {
    return this.service.post("/meeting", data).then((response) => response);
  };

  updateMeeting = (data) => {
    return this.service.post("/updateMeeting", data).then((response) => response);
  };

}

export default MeetingService;