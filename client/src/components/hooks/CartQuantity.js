const CartQuantity = () => {
  if (!localStorage.getItem("CartItems")) {
    return null;
  }
  if (localStorage.getItem("CartItems")) {
    let items = [...JSON.parse(localStorage.getItem("CartItems"))];
    let quant = items ? items.map(book => book.quantity) : null;
    quant = items.length >= 1 ? quant.reduce((acc, curr) => acc + curr) : null;
    return quant;
  }
  return null;
};

export default CartQuantity;
