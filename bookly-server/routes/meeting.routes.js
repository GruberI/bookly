const { Router } = require("express");
const mongoose = require("mongoose");
const Meeting = require("../models/meeting.model");
const BookClub = require("../models/bookclub.model");

const router = Router()

router.post("/meeting", (req, res) => {
    const { date, time, link, bookClubId } = req.body;

    Meeting.create({
        date,
        time,
        link,
        bookclub: bookClubId
    })
    .then((theResponse) => {
    return BookClub.findByIdAndUpdate( bookClubId, {meeting: theResponse._id})
      }).then((newResponse) => {
        res.status(200).json(newResponse);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
})

router.post("/updateMeeting", (req, res) => {
  const { date, time, link, bookClubId, meetingId } = req.body;
  console.log(req.body)

  Meeting.findByIdAndUpdate(meetingId, {date, time, link})
  .then((theResponse) => {
    return BookClub.findByIdAndUpdate( bookClubId, {meeting: theResponse._id})
      }).then((newResponse) => {
        res.status(200).json(newResponse);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
})

module.exports = router;

