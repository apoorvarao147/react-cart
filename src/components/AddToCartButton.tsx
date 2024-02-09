import "../styles/addToCartButton.scss";
import { useContext } from "react";
import {CartContext} from "./context/cartContext"
import toast, { Toaster } from "react-hot-toast";
import { Product, CartItems, CartType } from "./types";

type HandleQuantityProps ={
  id: string;
  dispatch: any;
  product: Product;
  cart: CartType

}

const AddToCartButton = ({ id, product }: {id: string, product: Product}) => {
  const {cart, dispatch} = useContext(CartContext)
  
  const isInCart = (cartItems: CartItems, product: Product) => {
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

const HandleQuantity = ({ id, dispatch, product, cart }: HandleQuantityProps) => {
  const inCartQuantity = (cartItems: CartItems, product: Product) => {
    const itemQuantity: any = cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    return itemQuantity.quantity;
  };

  const handleDecrease = (id: string) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const handleIncrease = (id: string) => {
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

const AddToCart = ({ product, dispatch }: {product: Product; dispatch: any}) => {
  const handleAdd = (product: Product) => {
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
