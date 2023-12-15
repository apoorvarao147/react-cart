//@ts-nocheck
import { useEffect, useState } from "react";
import "../styles/cart.scss";
import Order from "./Order";
import {Link} from 'react-router-dom'

function Cart({ cart, setCart, cartQuantity, setCartQuantity }) {
  // const [cartQuantity, setCartQuantity] = useState(0)

  useEffect(() => {
    let qty = cart.map(product => product.quantity)
    let result = qty.reduce((acc, item) => {
      return acc + item}, 0)
      setCartQuantity(result)
  },[cart])


  const handleDelete = (id) => {
    setCart(cart.filter(product => product.id !== id));
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

            {cartQuantity ? '' : <EmptyCart />}

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
                    {/* <button onClick={() => handleUpdate(item.id)}>
                      Update
                    </button> */}
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

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <p>Your cart is empty.</p>
      <Link to={"/"}>
        <button>View products</button>
      </Link>     
    </div>  
  )
}

export default Cart;
