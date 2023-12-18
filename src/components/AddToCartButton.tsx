//@ts-nocheck
import { useState } from "react";
import "../styles/addToCartButton.scss";

const AddToCartButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked ? (
        <HandleQuantity setIsClicked={setIsClicked} />
      ) : (
        <AddToCart setIsClicked={setIsClicked} />
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

const AddToCart = ({setIsClicked}) => {
  // const handleClick = () => {
  //   setIsClicked(true)
  // }
  return (
    <>
      <button onClick={() => setIsClicked(true)}>Add to Cart</button>
    </>
  );
};

export default AddToCartButton;
