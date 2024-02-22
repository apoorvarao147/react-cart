import "./products.scss";
import { useState, useEffect } from "react";
import AddToCartButton from "../addToCartButton/AddToCartButton";
import { Product } from "../types";
import ProgressBar from "../progressbar/ProgressBar";

const Products = () => {
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
            />
          </div>
        ))}
      </div>

    <ProgressBar />
    </>
  );
}

export default Products;
