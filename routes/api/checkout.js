const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Transaction = require("../../models/Transaction");

// @route   POST checkout
// @desc    POST transactions
// @access  Private

router.post("/", (req, res) => {
  const newTransaction = new Transaction({
    seller: req.body.transaction.seller,
    assistant: req.body.transaction.assistant,
    customer: req.body.transaction.customer,
    items: req.body.transaction.items,
    total: req.body.transaction.total
  });
  try {
    newTransaction.save().then(trans => res.json(trans));
    req.body.transaction.booksToUpdate.map(item => {
      Book.findById(item.id, (err, book) => {
        book.quantity = book.quantity - item.quantity;
        book.expire_at = null;
        book.save();
      });
    });
  } catch (err) {
    return res.status(401).json({ msg: "No token, authorizaton denied" });
  }
});

module.exports = router;
