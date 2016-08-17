var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Product = require('./product');

var userSchema = new Schema({
  lastSeen: Date,
  cart: [{
          product: Product.schema,
          quantity : Number
        }]
});

module.exports = mongoose.model("User",userSchema);
