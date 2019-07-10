import React from "react";
import { Container, Button } from "reactstrap";
// import { renderToString } from "react-dom/server";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

const Invoice = ({ invoiceNumber, user, books, subtotal, taxes, total }) => {
  const PrintPage = () => {
    window.print();
  };

  return (
    <>
      <Button onClick={() => PrintPage()}>Print Invoice</Button>
      <Container>
        <div
          id="divToPrint"
          className="mt4"
          style={{
            backgroundColor: "#f5f5f5",
            width: "218mm",
            minHeight: "297mm",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <div id="page-wrap">
            <p id="header">INVOICE</p>

            <div id="identity">
              <p id="address">
                Roberto Soriano Inc.
                <br />
                290 Robert Street, Boston MA 01234
                <br />
                Phone: (555) 555-5555
              </p>

              {/* <div id="logo">
                <img
                  id="image"
                  src="https://ibbreformada.org/wp-content/uploads/2019/06/LogoMakr_0R2xJD.png"
                  alt="logo"
                />
              </div> */}
            </div>

            <div style={{ clear: "both" }} />

            <div id="customer">
              <p id="customer-title">
                {user.name}
                <br />
                {user.phone}
                <br />
                {user.email}
              </p>

              <table id="meta">
                <tbody>
                  <tr>
                    <td className="meta-head">Invoice #</td>
                    <td>
                      <p>{invoiceNumber}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="meta-head">Date</td>
                    <td>
                      <p id="date">{Date().slice(0, 15)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="meta-head">Amount Due</td>
                    <td>
                      <div className="due">${total}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table id="items">
              <tbody>
                <tr>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </tbody>
              {books.map(book => (
                <tbody key={book._id}>
                  <tr className="item-row">
                    <td className="item-name">
                      <div className="delete-wpr">
                        <p>{book.name}</p>
                      </div>
                    </td>
                    <td className="description">
                      <p>{book.name}</p>
                    </td>
                    <td>
                      <p className="cost">${book.price}</p>
                    </td>
                    <td>
                      <p className="qty">{book.quantity}</p>
                    </td>
                    <td>
                      <span className="price">
                        ${(book.price * book.quantity).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}

              <tbody>
                <tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line">
                    Subtotal
                  </td>
                  <td className="total-value">
                    <div id="subtotal">${subtotal}</div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line">
                    Taxes
                  </td>
                  <td className="total-value">
                    <div id="total">${taxes}</div>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line balance">
                    Balance Due
                  </td>
                  <td className="total-value balance">
                    <div className="due">${total}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div id="terms">
              <h5>Terms</h5>
              <p>
                NET 30 Days. Finance Charge of 1.5% will be made on unpaid
                balances after 30 days.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Invoice;
