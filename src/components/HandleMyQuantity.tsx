//@ts-nocheck
import { useState } from "react";

const HandleMyQuantity = ({ setIsClicked, dispatch, id, productQuantity, setProductQuantity, cart, quantity }) => {

  const [qty, setQty] = useState(1);

  const handleDecrease = (id) => {
    // if (quantity > 1) {
    //   setQty((prev) => prev - 1);
    //   dispatch({ type: "DECREMENT", payload: id });
    //   setProductQuantity(prev => prev - 1)
    // }
    // dispatch({ type: "DECREMENT", payload: id });
    if (quantity === 1) {
      setIsClicked(false);
      dispatch({ type: "DELETE", payload: id });
    }
    dispatch({ type: "DECREMENT", payload: id });
  };
  const handleIncrease = (id) => {
    // if (quantity < 5) {
    //   setQty((prev) => prev + 1);
    //   dispatch({ type: "INCREMENT", payload: id });
    //   setProductQuantity(prev => prev + 1)
    // }
    dispatch({ type: "INCREMENT", payload: id });
  };
  return (
    <div className="handle-quantity">
      <button onClick={() => handleDecrease(id)}>−</button>
      <span>{quantity}</span>
      <button onClick={() => handleIncrease(id)}>+</button>
    </div>
  );
}

export default HandleMyQuantity;