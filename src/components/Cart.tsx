//@ts-nocheck
import { useEffect, useState } from "react";
import "../styles/cart.scss";
import Order from "./Order";

function Cart({ cart, setCart }) {
  const [cartQuantity, setCartQuantity] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    let qty = cart.map(product => product.quantity)
    let result = qty.reduce((acc, item) => {
      return acc + item}, 0)
      setCartQuantity(result)
  },[cart])


  const handleDelete = (id) => {
    setCart(cart.filter(product => product.id !== id));
  };

  const handleUpdate = (id) => {
    setUpdateProduct(cart.filter(product => product.id === id))
    setIsUpdate(true);
  };

  const increaseQuantity = (id) => {
    setCart(cart => 
      cart.map(product => 
        (id === product.id && product.quantity < 5) ? {...product, quantity: product.quantity + 1} : product
        ))
  }

  const decreaseQuantity = (id) => {
    setCart(cart => 
      cart.map(product => 
        (id === product.id && product.quantity > 1) ? {...product, quantity: product.quantity - 1} : product
        ))
  }

  return (
    <div id="/cart" className="cart-heading">
      <h2>Shopping Cart ({cartQuantity} items)</h2>

      <div className="cart">
        <h4>Review your order</h4>

        <div className="orders">
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="item">
                <img src={item.imgSrc} alt={item.name} />
                <div className="item-right">
                  <h3>{item.name}</h3>
                  <h4>${(item.price / 100).toFixed(2)}</h4>

                  <div className="update-quantity">
                    <p>Quantity: </p>
                    <div>
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>                   
                  </div>

                  <div className="quantity">
                    <button onClick={() => handleUpdate(item.id)}>
                      {isUpdate ? `Save` : `Update`}
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Order cart={cart} cartQuantity={cartQuantity} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
