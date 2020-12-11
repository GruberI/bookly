import axios from "axios";

class CurrentBookService {
  constructor() {
    this.service = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true
    });
  }

  createCurrentBook = (data) => {
    return this.service.post("/currentBook", data).then((response) => response);
  };

  updateCurrentBook = (data) => {
    return this.service
    .post("/updateCurrentBook", data)
    .then((response) => response);
  }

}

export default CurrentBookService;