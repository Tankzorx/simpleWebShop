var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  lastSeen: Date,
  cart: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("User",userSchema);
