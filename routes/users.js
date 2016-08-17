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

  // If user doesn't exist, generate a new one.
  if (userId === "undefined" || userId === "null") {
    let newUser = new User({lastSeen : new Date(), cart : cart})
    console.log(newUser);
    newUser.save((err) => {
      if (err) return console.log(err);
      res.send(newUser._id);
    })
  } else {
    // If userId was provided, update existing cart
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
