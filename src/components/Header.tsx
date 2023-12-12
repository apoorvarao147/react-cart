import '../styles/header.scss';
import {Link} from 'react-router-dom';
import cart from '../images/shopping-cart.png';
import logo from '../images/logo.png';
import { useState } from 'react';



function Header() {

  const [quantity, setQuantity] = useState(0)

  return (
    <div className="header">
      <div>
        <img src={logo} width="25px" />
        <h2>React Cart</h2>
      </div>

      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/cart"}>Cart</Link>
          </li>
          <li onClick={() => setQuantity(quantity => quantity + 1)}>
            <img src={cart} alt="cart" width="25px" />
            <p>{quantity}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header