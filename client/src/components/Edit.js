import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStoreActions } from "easy-peasy";
import { ListGroupItem, Button, Input } from "reactstrap";

const host =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

const Edit = props => {
  // console.log(props);

  const { updateBook, deleteBook } = useStoreActions(actions => ({
    updateBook: actions.updateBook,
    deleteBook: actions.deleteBook
  }));

  const bookId = props.match.params.id;
  const [book, setBook] = useState({
    book: {
      name: "l",
      subtitle: "l",
      author: "l",
      description: "l",
      price: "l",
      quantity: "l",
      pic: "l"
    }
  });
  const [newName, setNewName] = useState(book.name);
  const [newSubtitle, setNewSubtitle] = useState(book.subtitle);
  const [newAuthor, setNewAuthor] = useState(book.author);
  const [newDescription, setNewDescription] = useState(book.description);
  const [newPrice, setNewPrice] = useState(book.price);
  const [newQuantity, setNewQuantity] = useState(book.quantity);
  const [newPic, setNewPic] = useState(book.pic);
  //   const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const result = await axios(`${host}/api/books/${bookId}`);
      if (result.data !== null) {
        await setBook(result.data);
        await setNewName(book.name);
        await setNewSubtitle(book.subtitle);
        await setNewAuthor(book.author);
        await setNewDescription(book.description);
        await setNewPrice(book.price);
        await setNewQuantity(book.quantity);
        await setNewPic(book.pic);
      }

      //   result.data ? setLoaded(true) : setLoaded(false);
      // ...
    }
    fetchData();
  }, [
    book._id,
    book.author,
    book.description,
    book.name,
    book.pic,
    book.price,
    book.quantity,
    book.subtitle,
    bookId
  ]);

  const handleUpdate = (e, bookId) => {
    if (window.confirm("Are you sure you wish to update this item?")) {
      updateBook({
        id: bookId,
        book: {
          name: newName,
          subtitle: newSubtitle,
          author: newAuthor,
          description: newDescription,
          price: newPrice,
          quantity: newQuantity,
          pic: newPic
        }
      });
    }
    // setLoaded(false);
  };
  const handleDelete = (e, bookId) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteBook(bookId);
    }
    // setLoaded(false);
  };

  //!props.location.state
  return book.name === undefined ? (
    <>
      <div>No Book to edit...</div>
      <div>
        <Button color="primary" outline href="/">
          Go Back to Book List
        </Button>
      </div>
    </>
  ) : (
    <>
      <div className="edit-container" style={{ margin: "3rem" }}>
        <div className="form-group edit-container-form">
          <br />
          <br />
          <h2 className="edit-header">{newName}</h2>
          <ListGroupItem>
            <h5>Title</h5>
            <Input
              className=" form-control col-xs-2"
              placeholder="update book title"
              value={`${newName}`}
              onChange={e => setNewName(e.target.value)}
            />
            <h5>Subtitle</h5>
            <Input
              className=" form-control col-xs-2"
              placeholder="update book subtitle"
              value={`${newSubtitle}`}
              onChange={e => setNewSubtitle(e.target.value)}
            />
            <h5>Author</h5>
            <Input
              className=" form-control col-xs-2"
              placeholder="update book author"
              value={`${newAuthor}`}
              onChange={e => setNewAuthor(e.target.value)}
            />
            <h5>Description</h5>
            <Input
              className=" form-control col-xs-2"
              placeholder="update book description"
              value={`${newDescription}`}
              onChange={e => setNewDescription(e.target.value)}
            />
            <h5>Price</h5>
            <Input
              className=" form-control col-xs-2"
              placeholder="update book price"
              type="text"
              value={`${newPrice}`}
              onChange={e => setNewPrice(e.target.value)}
            />
            <h5>Quantity</h5>
            <button
              className="minus btn btn-info outline"
              onClick={e => setNewQuantity(newQuantity => newQuantity - 1)}
            >
              -
            </button>
            <input type="text" value={`${newQuantity}`} readOnly />
            <button
              className="plus btn btn-info outline"
              onClick={e => setNewQuantity(newQuantity => newQuantity + 1)}
            >
              +
            </button>
            <h5>Image</h5>
            <Input
              className=" form-control col-xs-2"
              placeholder="update book image"
              value={`${newPic}`}
              onChange={e => setNewPic(e.target.value)}
            />
            <br />
            <Button
              color="secondary"
              outline
              size="sm"
              onClick={e => handleUpdate(e, bookId)}
            >
              Update Book
            </Button>
            <Button
              color="secondary"
              outline
              size="sm"
              onClick={e => handleDelete(e, bookId)}
            >
              Delete Book
            </Button>
          </ListGroupItem>
        </div>
        <div className="edit-container-img">
          <img src={`${newPic}`} alt={newName} width="300px" height="300px" />
          <div className="edit-container-link">
            <Button color="primary" outline href="/">
              Go Back to Book List
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Edit;
