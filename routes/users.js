"use strict";
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

router.post("/save/:userId", (req,res) => {
  let userId = req.params.userId
  let cart = [];
  for (let key in req.body) {
    cart.push({product : req.body[key].product,quantity : req.body[key].quantity})
  }
  // Check if a user with the given ID exists.
	// If client gives a uid that can't be casted to ObjectId, we assume
	// that client doesn't have a user.
  User.findById(userId,(error,user) => {
    if (error && error.name !== "CastError") {
      console.log(error);
      return res.status(500).send(error);
    }
    // If no user found, create a new one
    if (!user) {
      let newUser = new User({lastSeen : new Date(), cart : cart})
      newUser.save((err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.send(newUser._id);
      })
    }
    // If one was found, update it.
    else {
      let query = User.update(
        {_id : userId},
        {cart : cart}
      )

      query.exec((error,data) => {
        if (error) {
          console.log(error);
          res.status(500).send(error)
        } else {
          res.send(userId);
        }
      })
    }
  })
})

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id,(err,user) => {
    if (err) {
      console.log(err);
    }
    res.send(user);
  })
});


module.exports = router;
