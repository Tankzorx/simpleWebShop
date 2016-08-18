var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema({
  productTitle: String,
  category: String,
  price: Number,
  currentStock: Number,
  images: [{id : Schema.Types.ObjectId, extension : String}],
  properties: [String],
  tags: [String],
  description: String,
});

module.exports = mongoose.model("Product",productSchema);
