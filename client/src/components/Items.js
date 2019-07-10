import React, { useEffect } from "react";
import {
  // useStoreState,
  useStoreActions
} from "easy-peasy";
import { Link } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AddItems from "./AddItems";
import increaseQuantity from "./hooks/increaseQuantity"; // To add items to cart
// import UserAuth from "./users/UserAuth";

// const host =
//   process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

const Items = ({ books, authed }) => {
  const {
    fetchBooks,
    fetchUserBooks,
    // deleteBook,
    logUser,
    logOut,
    setCart
  } = useStoreActions(actions => ({
    fetchBooks: actions.fetchBooks,
    fetchUserBooks: actions.fetchUserBooks,
    // deleteBook: actions.deleteBook,
    logUser: actions.logUser,
    logOut: actions.logOut,
    setCart: actions.setCart
  }));

  useEffect(() => {
    if (localStorage.getItem("BookStoreToken")) {
      logUser();
      fetchBooks();
      fetchUserBooks();
    } else {
      logOut();
    }

    // eslint-disable-next-line
  }, []);
  // const handleDelete = (e, book) => {
  //   if (window.confirm("Are you sure you wish to delete this item?")) {
  //     deleteBook(book._id);
  //   }
  //   window.location.reload();
  // };

  const bgcolor = null;
  return books.length === 0 || !books ? (
    <>
      <Container>
        <h2>You have no books!</h2>
        <h6>Add a book to your list.</h6>

        <AddItems className="add-item" />
      </Container>
    </>
  ) : (
    <>
      <Container style={{ marginTop: "5rem" }}>
        {authed && <AddItems className="add-item" />}
        <h2>Available Books</h2>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            <CSSTransition timeout={0} classNames="fade">
              <ListGroupItem>
                <Table
                  hover
                  responsive
                  borderless
                  style={{ overflowX: "auto" }}
                >
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Author</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Image</th>
                    </tr>
                  </thead>

                  {books.length > 0 &&
                    books.map(book => (
                      <tbody
                        key={book._id}
                        bgcolor={book.quantity <= 0 ? "coral" : "white"}
                        style={{
                          backgroundColor: bgcolor
                        }}
                      >
                        <tr>
                          <th scope="row">
                            {authed && (
                              <>
                                <Link
                                  to={{
                                    pathname: `/${book._id}`,
                                    state: { book }
                                  }}
                                >
                                  <Button className="edit-btn" outline>
                                    View/Edit
                                  </Button>
                                </Link>

                                <Link
                                  to={{
                                    pathname: `/cart`,
                                    state: { book }
                                  }}
                                >
                                  <Button
                                    className="edit-btn"
                                    outline
                                    onClick={() => {
                                      if (book.quantity <= 0) {
                                        alert(
                                          "This Book is not available! Please Order more with supplier."
                                        );
                                        window.location.replace("/");
                                      } else {
                                        increaseQuantity(book, setCart);
                                        window.location.reload();
                                      }
                                    }}
                                  >
                                    Add to Cart
                                  </Button>
                                </Link>
                              </>
                            )}
                          </th>
                          <td>{book.name}</td>
                          <td>{book.subtitle}</td>
                          <td>{book.author}</td>
                          <td>{book.description}</td>
                          <td>{book.price}</td>
                          <td>{book.quantity}</td>
                          <td>
                            <img
                              src={`${book.pic}`}
                              alt={book.name}
                              width="100px"
                              height="100px"
                            />
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </ListGroupItem>
            </CSSTransition>
          </TransitionGroup>
        </ListGroup>
      </Container>
    </>
  );
};

export default Items;
