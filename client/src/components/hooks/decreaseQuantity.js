const decreaseQuantity = (book, setCart) => {
  let item = [...JSON.parse(localStorage.getItem("CartItems"))].filter(
    item => item._id === book._id
  );
  item = item[0];
  let quant = item.quantity - 1;
  item = Object.assign(item, { quantity: quant });
  let items = [...JSON.parse(localStorage.getItem("CartItems"))];
  items = items.filter(book => book._id !== item._id);
  items.push(item);
  localStorage.setItem("CartItems", JSON.stringify(items));
  setCart(items);
  return;
};

export default decreaseQuantity;
