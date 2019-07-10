import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// For printing Invoice PDF
// import { renderToString } from "react-dom/server";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
//
import useForm from "./hooks/useForm";
import { useStoreState, useStoreActions } from "easy-peasy";
import Invoice from "./Invoice";
import CartTotal from "./hooks/CartTotal";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ListGroupItem,
  Table
  //   NavLink,
  //   Alert
} from "reactstrap";

const host =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

const CheckOut = props => {
  //   console.log(props.location.state.books);
  const books = props.location.state.books;

  const serverMsg = useStoreState(state => state.serverMsg);
  const [invoice, setInvoice] = useState(null);

  const [user, handleChange] = useForm({
    name: "",
    email: "",
    phone: "",
    assistant: ""
  });
  const [transaction, setTransaction] = useState(null);

  //   const [modal, setModal] = useState(false);

  useEffect(() => {}, [serverMsg]);
  const { fetchBooks, fetchUserBooks, logUser, logOut } = useStoreActions(
    actions => ({
      fetchBooks: actions.fetchBooks,
      fetchUserBooks: actions.fetchUserBooks,
      logUser: actions.logUser,
      logOut: actions.logOut
    })
  );

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

  const grandTotal = () => {
    return (CartTotal() + Math.round(CartTotal() * 0.0625 * 100) / 100).toFixed(
      2
    );
  };
  const seller = "Iglesia Bautista Bíblica Inc.";

  // Log Transaction
  const onSubmit = e => {
    e.preventDefault();
    // Set Transaction object
    const sendTrans = async () => {
      if (!user.assistant || !user.name) {
        alert("Please enter all customer's info.");
        return;
      } else {
        await setTransaction({
          seller: seller,
          assistant: user.assistant,
          customer: user.name,
          items: books.map(book => {
            return `${book.name}(${book.quantity})`;
          }),
          total: grandTotal()
        });
        await axios
          .post(
            `${host}/api/checkout`,
            {
              transaction: {
                seller: seller,
                assistant: user.assistant,
                customer: user.name,
                items: books.map(book => {
                  return `${book.name}(${book.quantity})`;
                }),
                total: grandTotal(),
                booksToUpdate: books.map(book => ({
                  id: book._id,
                  quantity: book.quantity
                }))
              }
            },
            {
              headers: {
                "Content-type": "application/json",
                "x-auth-token": `${localStorage.getItem("BookStoreToken")}`
              }
            }
          )
          .then(r => {
            console.log(r.status);
            console.log(r);
            setInvoice(r.data.invoice_number);
          })
          .catch(e => console.log(e));
      }
    };
    sendTrans();
  };

  return !books ? (
    <>
      <div>No Books Available</div>
    </>
  ) : !invoice ? (
    <>
      <Container
        style={{
          marginTop: "2rem",
          padding: "4rem",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <Col xs="12">
          <h4>Checkout</h4>
          <Form onSubmit={onSubmit} style={{ marginTop: "2rem" }}>
            <FormGroup>
              <section
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginBottom: "20px"
                }}
              >
                <Label for="name">Customer Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="mb-3"
                  value={user.name}
                  onChange={handleChange}
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  value={user.email}
                  onChange={handleChange}
                />

                <Label for="phone">Phone Number</Label>
                <Input
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="mb-3"
                  value={user.phone}
                  onChange={handleChange}
                />
                <Label for="assistant">Assistant</Label>
                <Input
                  type="assistant"
                  name="assistant"
                  id="assistant"
                  placeholder="Assistant's name"
                  className="mb-3"
                  value={user.assistant}
                  onChange={handleChange}
                />
              </section>
              <ListGroupItem>
                <h4>Order items</h4>
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
                          <td>{book.quantity}</td>
                          <td>${book.price}</td>
                          <td>${(book.price * book.quantity).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </ListGroupItem>
              <ListGroupItem style={{ float: "right", marginBottom: "1rem" }}>
                Subtotal: <strong> ${CartTotal()}</strong>
                <br />
                Taxes (6.25%):{" "}
                <strong>
                  {" "}
                  ${Math.round(CartTotal() * 0.0625 * 100) / 100}
                </strong>{" "}
                <br />
                <hr />
                Grand Total: <strong> ${grandTotal()}</strong> <br />
              </ListGroupItem>
              <ListGroupItem style={{ float: "left", marginBottom: "1rem" }}>
                <Link to={"/cart"}>
                  <Button>Edit Cart</Button>
                </Link>
              </ListGroupItem>
              <Button color="dark" style={{ marginTop: "0rem" }} block>
                Confirm Order
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Container>
      {invoice && (
        <div>
          <Invoice
            invoiceNumber={invoice}
            user={user}
            books={books}
            subtotal={CartTotal()}
            taxes={Math.round(CartTotal() * 0.0625 * 100) / 100}
            total={grandTotal()}
          />
        </div>
      )}
    </>
  ) : (
    <div>
      <Invoice
        invoiceNumber={invoice}
        user={user}
        books={books}
        subtotal={CartTotal()}
        taxes={Math.round(CartTotal() * 0.0625 * 100) / 100}
        total={grandTotal()}
      />
    </div>
  );
};

export default CheckOut;
