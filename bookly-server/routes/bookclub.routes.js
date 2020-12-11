const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const BookClub = require("../models/bookclub.model");
const User = require('../models/user.model')

/* POST - creates a new bookclub */
router.post("/create", (req, res) => {
    const { name, password, userId } = req.body;
  
    BookClub.create({
      name,
      password,
      members: [userId],
    })
      .then((newBC) => {
        return User.findOneAndUpdate({_id: userId}, {$push: {bookclubs: newBC._id}}, {new:true})
      })
      .then((response) => {

        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get("/userprofile/:id", (req, res) => {
    const userId = req.params.id

    User.findById(userId)
      .populate("bookclubs")
      .then((userwithbooks) => {
        res.status(200).json(userwithbooks);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  //get route for specifc bookclub details 12/5

  router.get("/bookclub/:id", (req, res) => {
    const { id } = req.params; //do I use req.params.id??
  
    // Check if the incoming id is a valid ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    BookClub.findById(id)
      .populate("members")
      .populate("meeting")
      .populate("currentBook")
      .then((bookclub) => {
        res.status(200).json(bookclub);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

//join a bookclub
router.post('/join', async (req, res) => {
  const { _id, userId } = req.body;
  try {
    await BookClub.findByIdAndUpdate(_id, {
      $addToSet: {
        members: userId
        }
      }
    );
    //userID = tester 2
    //_id = current bookclub
    const response = await User.findByIdAndUpdate(userId, {
      $push: {
        bookclubs: _id
      }}
    );
       //response is not coming back with what we need. Coming back with Tester1 Id
    res.status(200).send(response);
  } catch (err) {
      res.status(500).json(err);
  }
});

//Delete with async await updating User profile again.
router.post('/removeMember', async (req, res) => {
  const { bookclubId, memberId } = req.body;
  try {
    await BookClub.findByIdAndUpdate(bookclubId, {
      $pull: {
        members: memberId
        }
      }
    );
   
    await User.findByIdAndUpdate(memberId, {
      $pull: {
        bookclubs: bookclubId
      }}
    );
    const updatedBookclub = await BookClub.findById(bookclubId).populate("members meeting")
    res.status(200).send(updatedBookclub);
  } catch (err) {
      res.status(500).json(err);
  }
});


  module.exports = router;