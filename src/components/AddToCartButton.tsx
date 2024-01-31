//@ts-nocheck
import "../styles/addToCartButton.scss";
import { useContext } from "react";
import {CartContext} from "./context/cartContext"
import toast, { Toaster } from "react-hot-toast";

const AddToCartButton = ({ id, product }) => {
  const {cart, dispatch} = useContext(CartContext)
  
  const isInCart = (cartItems, product) => {
    return cartItems.some((cartItem) => cartItem.product.id === product.id);
  };

  return (
    <>
      {isInCart(cart.cartItems, product) ? (
        <HandleQuantity
          id={id}
          dispatch={dispatch}
          product={product}
          cart={cart}
        />
      ) : (
        <AddToCart product={product} dispatch={dispatch} />
      )}
    </>
  );
};

const HandleQuantity = ({ id, dispatch, product, cart }) => {
  const inCartQuantity = (cartItems, product) => {
    const itemQuantity = cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    return itemQuantity.quantity;
  };

  const handleDecrease = (id) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const handleIncrease = (id) => {
    dispatch({ type: "INCREMENT", payload: id });
  };

  return (
    <div className="handle-quantity">
      <button onClick={() => handleDecrease(id)}>−</button>
      {inCartQuantity(cart.cartItems, product) > 0 ? (
        <span>{inCartQuantity(cart.cartItems, product)}</span>
      ) : (
        ""
      )}
      <button onClick={() => handleIncrease(id)}>+</button>
    </div>
  );
};

const AddToCart = ({ product, dispatch }) => {
  const handleAdd = () => {
    toast.success("Added");
    dispatch({
      type: "ADD",
      payload: {
        product,
        quantity: 1,
      },
    });
  };
  return (
    <>
      <Toaster />
      <button onClick={() => handleAdd(product)}>Add to Cart</button>
    </>
  );
};

export default AddToCartButton;
