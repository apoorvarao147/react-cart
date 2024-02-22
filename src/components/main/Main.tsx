import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Products from "../products/Products";
import Cart from "../cart/Cart";
import Orders from "../orders/Orders";
import { useEffect, useReducer, useState } from "react";
import { cartReducer } from "../cartReducer";
import { CartContext } from "../context/cartContext";

const initialState = {
  cartItems: [],
};

const Main = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || '""');

    const ordersjson = JSON.parse(localStorage.getItem("orders") || '""');

    if (savedCart) {
      dispatch({type: "SAVEDCART", payload: savedCart})
      setOrders(ordersjson);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(cart);
    localStorage.setItem("cart", json);

    const ordersjson = JSON.stringify(orders);
    localStorage.setItem("orders", ordersjson);
  }, [cart, orders]);

  return (
    <div className="App">
      <CartContext.Provider value={{cart, dispatch}}>
      <BrowserRouter>
        <Header cart={cart}/>
        <Routes>
          <Route
            path="/"
            element={<Products/>}/>
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route
            path="/cart"
            element={<Cart setOrders={setOrders}/>}/>
        </Routes>
      </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
};

export default Main;
