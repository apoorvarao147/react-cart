import "./progressBar.scss";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { useState, useContext, useEffect } from "react";

const ProgressBar = () => {
  const { cart } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState("");
  const minPrice = (50).toFixed(2);

  useEffect(() => {
    let sum: number | string = 0;
    for (let item of cart.cartItems) {
      let price = Number((item.product.price / 100).toFixed(2));
      sum = sum + price * item.quantity;
    }
    sum = sum.toFixed(2);
    setSubTotal(sum);
  }, [cart]);

  let progressVal: number | string = Number(subTotal) / 50;

  return (
    <div className="progressBar">
      <progress className="progress" value={progressVal} />
      <div>
        <p>
          Subtotal: ${subTotal} / ${minPrice}
        </p>
      </div>
      <div>
        <Link to={"/cart"}>
          <button
            className={`continue-button ${
              Number(subTotal) < 50 ? "not-allowed" : "allowed"
            }`}
            disabled={Number(subTotal) < Number(minPrice)}
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProgressBar;
