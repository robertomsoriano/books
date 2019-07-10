import React, { useEffect } from "react";
import {
  // useStoreState,
  useStoreActions
} from "easy-peasy";
import { Link } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import AddItems from "./AddItems";
// import UserAuth from "./users/UserAuth";
import decreaseQuantity from "./hooks/decreaseQuantity";
import increaseQuantity from "./hooks/increaseQuantity";
import CartTotal from "./hooks/CartTotal";
// import CheckOut from "./CheckOut";

// const host =
//   process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

const CartItems = ({ books }) => {
  const {
    fetchBooks,
    fetchUserBooks,
    logUser,
    logOut,
    setCart,
    removeCartItem
  } = useStoreActions(actions => ({
    fetchBooks: actions.fetchBooks,
    fetchUserBooks: actions.fetchUserBooks,

    logUser: actions.logUser,
    logOut: actions.logOut,
    setCart: actions.setCart,
    removeCartItem: actions.removeCartItem
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
  const handleDelete = (e, book) => {
    if (
      window.confirm("Are you sure you want to delete this item from the cart?")
    ) {
      removeCartItem(book._id);
    }
    window.location.reload();
  };

  return books.length === 0 || !books ? (
    <>
      <Container>
        <h2>Your Shopping Cart is empty!</h2>
        <h6>Add a book to your list.</h6>

        <Link to={"/"}>
          <Button>Go to Books Dashboard</Button>
        </Link>
      </Container>
    </>
  ) : (
    <>
      <Container style={{ marginTop: "5rem" }}>
        <h2>Your Shopping Cart</h2>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            <CSSTransition timeout={0} classNames="fade">
              <ListGroupItem>
                <h4>Cart Items</h4>
                <hr />
                <Table
                  hover
                  responsive
                  borderless
                  style={{ overflowX: "auto" }}
                >
                  <thead>
                    <tr>
                      <th />
                      <th />
                      <th />
                      <th>Quantity</th>
                      <th>Item Price</th>
                      <th>Item Total</th>
                    </tr>
                  </thead>
                  {books.length > 0 &&
                    books.map(book => (
                      <tbody key={book._id}>
                        <tr>
                          <th scope="row" />
                          <td>
                            <img
                              src={`${book.pic}`}
                              alt={book.name}
                              width="100px"
                              height="100px"
                            />
                          </td>
                          <td>{book.name}</td>

                          <td>
                            <Link
                              to={{
                                pathname: `/cart`,
                                state: { book }
                              }}
                            >
                              <Button
                                className="edit-btn"
                                size="sm"
                                outline
                                onClick={e => {
                                  if (book.quantity === 1) {
                                    handleDelete(e, book);
                                    return;
                                  }
                                  decreaseQuantity(book, setCart);
                                  window.location.reload();
                                }}
                                style={{ fontSize: "10px", margin: "4px" }}
                              >
                                -
                              </Button>
                            </Link>
                            {book.quantity}
                            <Link
                              to={{
                                pathname: `/cart`,
                                state: { book }
                              }}
                            >
                              <Button
                                className="edit-btn"
                                outline
                                size="sm"
                                onClick={() => {
                                  increaseQuantity(book, setCart);
                                  window.location.reload();
                                }}
                                style={{ fontSize: "10px", margin: "4px" }}
                              >
                                +
                              </Button>
                            </Link>
                            <br />
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              outline
                              onClick={e => handleDelete(e, book)}
                              style={{ fontSize: "11px", margin: "2px" }}
                            >
                              &times; remove
                            </Button>
                          </td>
                          <td>${book.price}</td>
                          <td>${(book.price * book.quantity).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </ListGroupItem>
            </CSSTransition>
          </TransitionGroup>
        </ListGroup>
        <ListGroupItem style={{ float: "right" }}>
          Subtotal: <strong> ${CartTotal()}</strong> <br />
          <hr />
          <Link
            to={{
              pathname: `/checkout`,
              state: { books }
            }}
          >
            <Button style={{ textDecoration: "none" }}>
              Proceed to Checkout
            </Button>
          </Link>
        </ListGroupItem>
        <ListGroupItem style={{ float: "left" }}>
          <Link to={"/"}>
            <Button>Click here to keep shopping</Button>
          </Link>
        </ListGroupItem>
      </Container>
    </>
  );
};

export default CartItems;
