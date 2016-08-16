"use strict";
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

router.get("/save", (req,res) => {

  let cart = [mongoose.Types.ObjectId()];
  let newUser = new User({lastSeen : new Date(),cart : cart})
  console.log(newUser);
  newUser.save((err) => {
    if (err) return console.log(err);
    res.send("Success");
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
