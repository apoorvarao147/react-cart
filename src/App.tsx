//@ts-nocheck
import './styles/app.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import { useState } from 'react';

function App() {

  const[cart, setCart] = useState<any>([])

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
