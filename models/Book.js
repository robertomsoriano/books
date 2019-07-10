const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pic: {
    type: String
  },
  release_date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String
    // ,
    // required: true
  },
  expire_at: { type: Date, default: Date.now, expires: 180 }
});

module.exports = Book = mongoose.model("books", BookSchema);
