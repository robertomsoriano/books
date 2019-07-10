const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
  seller: {
    type: String,
    required: true
  },
  assistant: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  sale_date: {
    type: Date,
    default: Date.now
  },
  invoice_number: {
    type: String,
    default: Date.now()
  },
  items: {
    type: [String]
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema
);
