const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Book Model
const Book = require("../../models/Book");

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get("/", (req, res) => {
  // console.log("one");
  Book.find()
    .sort({ name: -1 })
    .then(books => res.send(books));
});
// @route   GET api/books/:id
// @desc    Get single books
// @access  Public
router.get("/:id", (req, res) => {
  // console.log("one");
  Book.findById(req.params.id, (err, book) => {
    if (err)
      return res
        .status(404)
        .json({ msg: "Request Not Valid, Book Not Found." });
    res.json(book);
  });
});
// @route   POST api/books/user/books
// @desc    GET  user's books
// @access  Private
router.post("/user/:userId", auth, (req, res) => {
  Book.find((err, books) => {
    if (err)
      return res
        .status(404)
        .json({ msg: "Request Not Valid, Books Not Found." });
    res.json(books);
  });
});

// @route   POST api/books
// @desc    POST to books
// @access  Private
router.post("/", auth, (req, res) => {
  const newBook = new Book({
    name: req.body.book.name,
    subtitle: req.body.book.subtitle,
    author: req.body.book.author,
    description: req.body.book.description,
    price: req.body.book.price,
    quantity: req.body.book.quantity,
    pic: req.body.book.pic,
    user: req.body.book.user
  });
  try {
    newBook.save().then(book => res.json(book));
  } catch (err) {
    return res.status(401).json({ msg: "No token, authorizaton denied" });
  }
});

// @route   PUT api/books/:id
// @desc    PUT to books
// @access  Private
router.put("/:id", auth, (req, res) => {
  // console.log(req.body);
  Book.findById(req.params.id, (err, book) => {
    if (Date(book.release_date) <= Date("07022019")) {
      return;
    } else {
      (book.name = req.body.book.name),
        (book.subtitle = req.body.book.subtitle),
        (book.author = req.body.book.author),
        (book.description = req.body.book.description),
        (book.price = req.body.book.price),
        (book.quantity = req.body.book.quantity),
        (book.pic = req.body.book.pic),
        (book.expire_at =
          Date(book.release_date) <= Date("07022019") ? null : Date.now());
    }
    book.save();
    res.json(book);
  });
});

// @route   DELELTE api/books
// @desc    DELETE all books
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Book.findById(req.params.id)
    .then(book =>
      book.remove().then(() => res.json({ success: true, deleted: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
