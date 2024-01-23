//@ts-nocheck
import "./styles/app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { useEffect, useReducer, useState } from "react";
import { cartReducer } from "./components/cartReducer";

const initialState = {
  cartItems: [],
};

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let json = localStorage.getItem("cart");
    const savedCart = JSON.parse(json);

    let ordersjson = localStorage.getItem("orders");
    ordersjson = JSON.parse(ordersjson);

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
      <BrowserRouter>
        <Header
          cart={cart}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Products
                cart={cart}
                dispatch={dispatch}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setOrders={setOrders}
                dispatch={dispatch}
              />
            }
          />
          <Route path="/orders" element={<Orders orders={orders} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
