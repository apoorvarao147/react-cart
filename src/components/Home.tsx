//@ts-nocheck
import "../styles/home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import toast from 'react-hot-toast'

function Home({ cart, setCart, cartQuantity, setCartQuantity }) {
  const [products, setProducts] = useState<any>([]);
  console.log(cart)

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch(`${process.env.REACT_APP_BACKEND_API}/product`);
      data = await data.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  const addToCartHandler = (options: any) => {
    toast.success("Added")
    if (cart.length > 0) {
      let itemIsPresent = false;
      for (let item of cart) {
        if (item.id === options.id) {
          itemIsPresent = true;
        }
      }
      itemIsPresent ? setCart([...cart]) : setCart([...cart, options]);
      itemIsPresent
        ? setCartQuantity(cartQuantity)
        : setCartQuantity(cartQuantity + 1);
    } else {
      setCart([...cart, options]);
      setCartQuantity(cartQuantity + 1);
    }
  };

  return (
    <>
      <div className="home">
        {products.map((product) => (
          <Products
            key={product.id}
            id={product.id}
            name={product.productName}
            imgSrc={product.url}
            price={product.price}
            addToCartHandler={addToCartHandler}
            cart={cart}
          />
        ))}
      </div>
      <div className="checkout">
        <Link to={"/cart"}>
          <button disabled={!cart.length > 0}>Go to Checkout</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
