const { Router } = require("express");
const mongoose = require("mongoose");
// const { BookclubDetails } = require("../../bookly-frontend/src/components/BookclubHome/BookClubDetails");
const CurrentBook = require("../models/currentBook.model");
const BookClub = require("../models/bookclub.model");

const router = Router()

//get route for a specifc book
//dont know which route to use
// router.get("/bookclub/:id", (req, res) => {
//     const { currentBookId } = req.params;
  
    
//     CurrentBook.findById(currentBookId)
//       .then((currentBook) => {
//         res.status(200).json(currentBook);
//       })
//       .catch((error) => {
//         res.status(500).json(error);
//       });
//   });

//create new currentBoook
router.post("/currentBook", (req, res) => {
    const { title, author, image, description, bookClubId} = req.body;

    CurrentBook.create({
        title,
        author,
        image,
        description,
        bookclub: bookClubId
    })
    .then((theResponse) => {
    return BookClub.findByIdAndUpdate( bookClubId, {currentBook: theResponse._id})
      }).then((newResponse) => {
        res.status(200).json(newResponse);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
});

router.post("/updateCurrentBook", (req, res) => {
  const { title, author, image, description, bookClubId, currentBookId } = req.body;

  CurrentBook.findByIdAndUpdate(currentBookId, {title, author, image, description})
  .then((theResponse) => {
    return BookClub.findByIdAndUpdate( bookClubId, {currentBook: theResponse._id})
      }).then((newResponse) => {
        res.status(200).json(newResponse);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
})

module.exports = router;