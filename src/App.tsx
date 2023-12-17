//@ts-nocheck
import "./styles/app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders"
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState<any>([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [orders, setOrders] = useState([])


  useEffect(() => {
    let json = localStorage.getItem("cart");
    const savedCart = JSON.parse(json);

    let qtyjson = localStorage.getItem("quantity");
    qtyjson = JSON.parse(qtyjson);

    let ordersjson = localStorage.getItem("orders");
    ordersjson = JSON.parse(ordersjson);

    if (savedCart) {
      setCart(savedCart);
      setCartQuantity(qtyjson);
      setOrders(ordersjson);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(cart);
    localStorage.setItem("cart", json);

    const qtyjson = JSON.stringify(cartQuantity);
    localStorage.setItem("quantity", qtyjson);

    const ordersjson = JSON.stringify(orders);
    localStorage.setItem("orders", ordersjson);

  }, [cart, cartQuantity, orders]);


  return (
    <div className="App">
      <BrowserRouter>
        <Header cartQuantity={cartQuantity} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cart={cart}
                setCart={setCart}
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
                setOrders={setOrders}
              />
            }
          />
          <Route path="/orders" element={<Orders orders={orders} />} />
        </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
