import "./header.scss";
import { Link } from "react-router-dom";
import cartImage from "../images/shopping-cart.png";
import logo from "../images/logo.png";
import {CartType} from "../types"

const Header = ({ cart }: {cart?: CartType}) => {
  const quantityArray: Array<number> = [];
  cart?.cartItems?.map((item) => quantityArray.push(item.quantity));
  const quantityInCart = quantityArray.reduce((acc, curr) => acc + curr, 0);


  return (
    <div className="header">
      <div>
        <Link to={"/"}>
          <img src={logo} width="25px" alt="logo" />
          <h2>React Cart</h2>
        </Link>
      </div>

      <div>
        <ul>
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/orders"}>Orders</Link>
          </li>
          <li>
            <Link to={"/cart"}>
              Cart
              <img src={cartImage} alt="cart" />
              <p>{quantityInCart}</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
