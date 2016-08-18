"use strict";
var Product = require('../models/product');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let parseJson = bodyParser.json();
var mongoose = require('mongoose');
let parseUrlencoded = bodyParser.urlencoded({ extended: false });
var fileUpload = require('express-fileupload');

router.get("/search", parseJson,parseUrlencoded,(req,res) => {
  // let tags = [];
  // let query = {};
  // if (req.query.tags) {
  //   for (let tag of req.query.tags.split(",")) {
  //     tags.push(tag);
  //   }
  // }
  // Need to improvise a somewhat decent search algorith..
  let keyword = req.query.keyword || "";
  console.log(keyword);
  let query = Product.find(
   { $text: { $search: keyword } },
   { score: { $meta: "textScore" } }
  ).sort( { score: { $meta: "textScore" } } ).limit(5)

  query.exec((error,products) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    }
    return res.send(products);
  })
})

router.get("/:id", parseJson,parseUrlencoded,(req,res) => {
  Product.findById(req.params.id, (err,product) => {
    res.send(product);
  })
})

router.get("/", parseJson,parseUrlencoded, (req,res) => {
  let query = Product.find({}).limit(10)
  query.exec((error,data) => {
    if (error) {
      res.status(500).send(err);
    }

    res.send(data);

  })
})

router.get("/tag",parseJson,parseUrlencoded, (req,res) => {

})

router.post("/add", parseJson,parseUrlencoded,(req,res) => {
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

router.post("/addimage", fileUpload(), parseUrlencoded, (req,res) => {
  let productId = req.body.productId;
  console.log(req);
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
  for (let file in req.files) {
    let fileExt = getFileExt(req.files[file].name);
    if (!fileExt) {
      return res.status(500).send("Invalid file extension: " + req.files[file].name)
    }
  }

  let counter = 0;
  let imageIds = [];
  for (let file in req.files) {
    let imgId = mongoose.Types.ObjectId();
    let fileExt = getFileExt(req.files[file].name);
    imageIds.push({"id" : imgId,"extension" : fileExt});
    req.files[file].mv(__dirname + "/../public/images/" + imgId + fileExt, function(err) {
      if (err) {
        // In case of error, we don't roll back anything.
        return res.status(500).send(err);
      }
      else {
        counter += 1;
        // If we saved all images, we go ahead and update the product to which
        // The images are related to.
        if (counter === Object.keys(req.files).length) {
          let query;
          try {
            query = Product.update(
              { _id : productId },
              { $pushAll: {images : imageIds} }
            )
          } catch (e) {
            return res.status(500).send(e);
          }
          query.exec((error,data) => {
            console.log(error);
            console.log(data);
            if (error) {
              return res.status(500).send(error);
            }
            return res.send("Success")
          })
        }
      }
    });
  }
})

var getFileExt = (filename) => {
  let pattern = /.+(\..+)$/;
  var match = pattern.exec(filename)
  if (match) {
    return match[1];
  }
  return false;
}
module.exports = router;
