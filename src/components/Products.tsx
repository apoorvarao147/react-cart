//@ts-nocheck
import "../styles/products.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

function Products({ cart, dispatch }) {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch(`${process.env.REACT_APP_BACKEND_API}/product`);
      data = await data.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="products-main">
        {products.map((product) => (
          <div key={product.id} className="products">
            <div className="product-image">
              <img src={product.url} alt={product.productName} />
            </div>
            <p>{product.productName}</p>
            <h4>${(product.price / 100).toFixed(2)}</h4>
            <AddToCartButton
              id={product.id}
              product={product}
              cart={cart}
              dispatch={dispatch}
            />
          </div>
        ))}
      </div>
      <div className="checkout">
        <Link to={"/cart"}>
          <button disabled={!cart.cartItems.length > 0}>Go to Checkout</button>
        </Link>
      </div>
    </>
  );
}

export default Products;
