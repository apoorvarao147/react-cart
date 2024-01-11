//@ts-nocheck
import { useState, useEffect } from "react";
import "../styles/addToCartButton.scss";
import toast, { Toaster } from "react-hot-toast";

const AddToCartButton = ({ id, product, cart, dispatch }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [productQuantity, setProductQuantity] = useState();
  console.log(cart)

  // useEffect(() => {
  //   let clickjson = localStorage.getItem("isClicked");
  //   clickjson = JSON.parse(clickjson);
  //   console.log(isClicked)
  //   setIsClicked(clickjson)
  // }, []);

  useEffect(() => {
    const clickjson = JSON.stringify(isClicked);
    localStorage.setItem("isClicked", clickjson);
    console.log(clickjson)
  }, [isClicked]);

  return (
    <>
      {isClicked ? (
        <HandleQuantity
          setIsClicked={setIsClicked}
          dispatch={dispatch}
          id={id}
          cart={cart}
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
        />
      ) : (
        <AddToCart
          setIsClicked={setIsClicked}
          id={id}
          product={product}
          cart={cart}
          dispatch={dispatch}
          setProductQuantity={setProductQuantity}
        />
      )}
    </>
  );
};

const HandleQuantity = ({ setIsClicked, dispatch, id, productQuantity, setProductQuantity, cart }) => {
  const [qty, setQty] = useState(1);

  const handleDecrease = (id) => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
      dispatch({ type: "DECREMENT", payload: id });
      setProductQuantity(prev => prev - 1)
    }
    if (qty === 1) {
      setIsClicked(false);
      dispatch({ type: "DELETE", payload: id });
    }
  };
  const handleIncrease = (id) => {
    if (qty < 5) {
      setQty((prev) => prev + 1);
      dispatch({ type: "INCREMENT", payload: id });
      setProductQuantity(prev => prev + 1)
    }
  };
  return (
    <div className="handle-quantity">
      <button onClick={() => handleDecrease(id)}>−</button>
      <span>{qty}</span>
      <button onClick={() => handleIncrease(id)}>+</button>
    </div>
  );
};

const AddToCart = ({ setIsClicked, dispatch, product, setProductQuantity }) => {
  const handleAdd = () => {
    setIsClicked(true);
    toast.success("Added");
    dispatch({
      type: "ADD",
      payload: {
        product,
        quantity: 1,
      },
    });
    setProductQuantity(1);
  };
  return (
    <>
      <Toaster />
      <button onClick={() => handleAdd(product)}>Add to Cart</button>
    </>
  );
};

export default AddToCartButton;
