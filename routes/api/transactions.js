const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Transaction = require("../../models/Transaction");

// @route   POST api/books/user/books
// @desc    GET Transactions by invoice #
// @access  Private
router.post("/", auth, (req, res) => {
  Transaction.find()
    .sort({ invoice_number: -1 })
    .then(trans => res.send(trans));
});

module.exports = router;
