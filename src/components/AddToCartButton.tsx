//@ts-nocheck
import { useState } from "react";
import "../styles/addToCartButton.scss";

const AddToCartButton = ({id,
  name,
  imgSrc,
  price,
  addToCartHandler,
  cart,}) => {
  const [isClicked, setIsClicked] = useState(false);
  console.log(isClicked)

  return (
    <>
      {isClicked ? (
        <HandleQuantity setIsClicked={setIsClicked} />
      ) : (
        <AddToCart setIsClicked={setIsClicked}
        id={id}
        name={name}
        imgSrc={imgSrc}
        price={price}
        addToCartHandler={addToCartHandler}
        cart={cart} 
         />
      )}
    </>
  );
};

const HandleQuantity = ({ setIsClicked }) => {
  const [qty, setQty] = useState(1);

  const handleDecrease = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
    if (qty === 1) {
      setIsClicked(false);
    }
  };
  const handleIncrease = () => {
    if (qty < 5) {
      setQty((prev) => prev + 1);
    }
  };
  return (
    <div className="handle-quantity">
      <button onClick={handleDecrease}>−</button>
      <span>{qty}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

const AddToCart = ({setIsClicked, id,
  name,
  imgSrc,
  price,
  addToCartHandler,
  cart}) => {
  const handleClick = () => {
    setIsClicked(true)
    addToCartHandler({ id, name, imgSrc, price, quantity: 1 })
  }


  return (
    <>
      <button onClick={handleClick}>Add to Cart</button>
    </>
  );
};

export default AddToCartButton;
