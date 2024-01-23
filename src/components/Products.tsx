//@ts-nocheck
import "../styles/products.scss";
import { useState, useEffect, Dispatch } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: string;
  productName: string;
  url: string;
  price: number;
}

type ProductsProps = {

}

const Products = ({ cart, dispatch }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/product`);
      const data = await response.json() as Product[];
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
          <button
            className={cart.cartItems.length > 0 ? "" : "not-visible"}
          >
            Go to Checkout
          </button>
        </Link>
      </div>
    </>
  );
}

export default Products;
