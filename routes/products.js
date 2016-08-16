"use strict";
var Product = require('../models/product');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let parseJson = bodyParser.json();
let parseUrlencoded = bodyParser.urlencoded({ extended: false });
var fileUpload = require('express-fileupload');

router.get("/search/:query",(req,res) => {
  res.send("Much products");
  // Need to improvise a somewhat decent search algorith..
})

router.get("/:id",(req,res) => {
  Product.findById(req.params.id, (err,product) => {
    res.send(product);
  })
})

router.get("/", (req,res) => {
  let query = Product.find({}).limit(10)
  query.exec((error,data) => {
    if (error) {
      res.status(500).send(err);
    }

    res.send(data);

  })
})

router.post("/add",(req,res) => {
  // Might need to verify the data.
  // console.log("BODY:");
  // console.log(req.body);
  // console.log("BODY END");
  let newProduct = new Product({
    productTitle : req.body.productTitle,
    category : req.body.category,
    price : req.body.price,
    currentStock : req.body.currentStock,
    properties : req.body.properties,
    description : req.body.description,
    tags : req.body.tags
  })
  newProduct.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("Inserted: " + newProduct);
    res.send(newProduct._id);
  })
})

router.post("/addimage", fileUpload(), (req,res) => {
  var sampleFile;
  console.log(req.body.kappa);
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  sampleFile = req.files.sampleFile;
  console.log(__dirname + "/../data/data.jpg")
  sampleFile.mv(__dirname + "/../data/data.jpg", function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }
  });
})

module.exports = router;
