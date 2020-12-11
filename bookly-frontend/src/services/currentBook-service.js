import axios from "axios";

class CurrentBookService {
  constructor() {
    this.service = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true
    });
  }

  // Create new meeting
  createCurrentBook = (data) => {
    return this.service.post("/currentBook", data).then((response) => response);
  };

  //Method to update meeting
  updateCurrentBook = (data) => {
    return this.service
    .post("/updateCurrentBook", data)
    .then((response) => response);
  }

}

export default CurrentBookService;