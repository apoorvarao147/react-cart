//@ts-nocheck
import "../styles/cart.scss";
import OrderItems from "./OrderItems";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  setOrders,
  dispatch
}) => {

  const quantityArray = [];
  cart.cartItems.map((item) => quantityArray.push(item.quantity));
  const quantityInCart = quantityArray.reduce((acc, curr) => acc + curr, 0);


  const handleDelete = (id) => {
    dispatch({type: "DELETE", payload: id})
  };

  const increaseQuantity = (id) => {
    dispatch({type: "INCREMENT", payload: id})
  };

  const decreaseQuantity = (id) => {
    dispatch({type: "DECREMENT", payload: id})
  };

  return (
    <div id="/cart" className="cart-heading">
      <h2>Shopping Cart ({quantityInCart} items)</h2>

      <div className="cart">
        <h4>Review your order</h4>
        <div className="cart-orders">
          <div className="order-items">
            {cart.cartItems.length > 0 ? "" : <EmptyCart /> } 

            {cart.cartItems.map((item) => (
              <div key={item.id} className="item">
                <img src={item.product.url} alt={item.product.productName} />
                <div className="item-right">
                  <h3>{item.product.productName}</h3>
                  <h4>${(item.product.price / 100).toFixed(2)}</h4>

                  <div className="update-quantity">
                    <p>Quantity: </p>
                    <div>
                      <button onClick={() => decreaseQuantity(item.product.id)}>
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => increaseQuantity(item.product.id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="quantity">
                    <button onClick={() => handleDelete(item.product.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <OrderItems
            cart={cart}
            setOrders={setOrders}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
}

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <p>Your cart is empty.</p>
      <Link to={"/"}>
        <button>View products</button>
      </Link>
    </div>
  );
};

export default Cart;
