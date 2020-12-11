import axios from "axios";

class MeetingService {
  constructor() {
    this.service = axios.create({
        baseURL: "http://localhost:5000",
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