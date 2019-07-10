const CartTotal = () => {
  let items = [...JSON.parse(localStorage.getItem("CartItems"))];
  let quant = items.map(book => book.price * book.quantity);
  quant = quant.reduce((acc, curr) => acc + curr);
  return Math.round(quant * 100) / 100;
};

export default CartTotal;
