import React, { useEffect } from "react";
import CartItems from "./CartItems";
import { useStoreState, useStoreActions } from "easy-peasy";

const Cart = props => {
  const cart = useStoreState(state => state.cart);
  const { emptyCart } = useStoreActions(actions => ({
    emptyCart: actions.emptyCart
  }));
  // console.log(cart);

  useEffect(() => {}, [cart]);
  return !cart ? (
    <>
      <div>Cart is Empty</div>
    </>
  ) : (
    cart && (
      <>
        <button onClick={() => emptyCart()}>Empty</button>
        <CartItems books={cart} />
      </>
    )
  );
};

export default Cart;
