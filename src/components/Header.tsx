//@ts-nocheck
import '../styles/header.scss';
import {Link} from 'react-router-dom';
import cart from '../images/shopping-cart.png';
import logo from '../images/logo.png';

function Header({cartQuantity}) {

  return (
    <div className="header">
      <div>
        <Link to={"/"}>
          <img src={logo} width="25px" />
          <h2>React Cart</h2>
        </Link>
      </div>

      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/orders"}>Orders</Link>
          </li>
          <li>
            <Link to={"/cart"}>Cart
            <img src={cart} alt="cart" />
            <p>{cartQuantity}</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header