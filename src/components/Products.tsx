//@ts-nocheck
import "../styles/products.scss";
import {Toaster} from 'react-hot-toast';
import AddToCartButton from "./AddToCartButton";

interface ProductsProps {
  id: string;
  name: string;
  imgSrc: string;
  price: number;
  handler: any;
};

const Products = ({
  id,
  name,
  imgSrc,
  price,
  handler,
  cart,
}: ProductsProps) => {
  let isProductFound = false;
  for (let item of cart) {
    if (item.id === id) {
      isProductFound = true;
    }
  }

  return (
    <div className="products">
      <Toaster />
      <div className="product-image">
        <img src={imgSrc} alt={name} />
      </div>
      <p>{name}</p>
      <h4>${(price / 100).toFixed(2)}</h4>
      {/* <button
        disabled={isProductFound && true}
        onClick={() => handler({ id, name, imgSrc, price, quantity: 1 })}       
        >
        {isProductFound ? "Added" : "Add to Cart"}
        Add to Cart
      </button> */}
      <AddToCartButton />
    </div>
  );
};

export default Products;
