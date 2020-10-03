import React, { useState } from "react";
import formatCurrentcy from "../util";
import Fade from "react-reveal/Fade";

function Cart({ cartItems, removeFromCart, createOrder }) {
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [input, setInput] = useState({
    email: "",
    name: "",
    address: "",
  });
  const Order = (e) => {
    e.preventDefault();
    const order = {
      name: input.name,
      email: input.email,
      addres: input.address,
      cartItems: cartItems,
    };
    createOrder(order);
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} in the cart
        </div>
      )}
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>{item.title}</div>
                <div className="right">
                  {formatCurrentcy(item.price)}x{item.count}
                  <button
                    className="button"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
      {cartItems.length !== 0 && (
        <div className="cart">
          <div className="total">
            <div>
              Total:
              {formatCurrentcy(
                cartItems.reduce(
                  (sum, item) => sum + item.price * item.count,
                  0
                )
              )}
            </div>
            <button
              onClick={() => setShowCheckOut(!showCheckOut)}
              className="button primary"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
      {showCheckOut && (
        <Fade right cascade>
          <div className="cart">
            <form onSubmit={Order}>
              <ul className="form-container">
                <li>
                  <label>Email</label>
                  <input
                    value={input.email}
                    name="email"
                    type="email"
                    required
                    onChange={handleInput}
                  />
                </li>
                <li>
                  <label>Name</label>
                  <input
                    value={input.name}
                    name="name"
                    type="text"
                    required
                    onChange={handleInput}
                  />
                </li>
                <li>
                  <label>Address</label>
                  <input
                    value={input.address}
                    name="address"
                    type="text"
                    required
                    onChange={handleInput}
                  />
                </li>
                <li>
                  <button className="button primary " type="submit">
                    Checkout
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </Fade>
      )}
    </>
  );
}

export default Cart;
