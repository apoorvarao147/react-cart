//@ts-nocheck
import "../styles/products.scss";

type ProductsProps = {
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
    <div className="productCard">
      <div>
        <img src={imgSrc} alt={name} />
      </div>
      <p>{name}</p>
      <h4>${(price / 100).toFixed(2)}</h4>
      <button
        onClick={() => handler({ id, name, imgSrc, price, quantity: 1 })}
        disabled={isProductFound ? "true" : ""}
      >
        {isProductFound ? "Added" : "Add to Cart"}
        {/* Add to Cart */}
      </button>
    </div>
  );
};

export default Products;
