const increaseQuantity = (book, setCart) => {
  // let item = JSON.parse(JSON.stringify(book));
  if (localStorage.getItem("CartItems")) {
    // console.log("cart was not empty");
    if (localStorage.getItem("CartItems").includes(book._id)) {
      // console.log("item found in cart");
      let item = [...JSON.parse(localStorage.getItem("CartItems"))].filter(
        item => item._id === book._id
      );
      item = item[0];
      // console.log(item);
      let quant = item.quantity + 1;
      item = Object.assign(item, { quantity: quant });
      let items = [...JSON.parse(localStorage.getItem("CartItems"))];
      items = items.filter(book => book._id !== item._id);
      items.push(item);
      // console.log(...items);
      localStorage.setItem("CartItems", JSON.stringify(items));
      // console.log(localStorage.getItem("CartItems"));
      setCart(items);
      return;
    } else if (!localStorage.getItem("CartItems").includes(book._id)) {
      // console.log("item not found in cart");
      let item = JSON.parse(JSON.stringify(book));
      item = Object.assign(item, { quantity: 1 });
      let items = [...JSON.parse(localStorage.getItem("CartItems"))];
      items.push(item);
      // console.log(...items);
      localStorage.setItem("CartItems", JSON.stringify(items));
      // console.log(localStorage.getItem("CartItems"));
      setCart(items);
      return;
    }
  } else {
    // console.log("cart was empty");
    let item = JSON.parse(JSON.stringify(book));
    item = Object.assign(item, { quantity: 1 });
    let items = Array.of(item);
    // console.log(items);
    localStorage.setItem("CartItems", JSON.stringify(items));
    // console.log(localStorage.getItem("CartItems"));
    setCart(items);
    return;
  }
  return;
};
export default increaseQuantity;
