//@ts-nocheck
import "../styles/home.scss";
import { useState, useEffect } from "react";

function Home({ cart, setCart, cartQuantity, setCartQuantity }) {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch(`${process.env.REACT_APP_BACKEND_API}/product`);
      data = await data.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  const addToCartHandler = (options: any) => {
    if(cart.length > 0) {
      let itemIsPresent = false
      for (let item of cart) {        
        if (item.id === options.id) {
          itemIsPresent = true
        }
      }
      itemIsPresent ? setCart([...cart]): setCart([...cart, options])
      itemIsPresent ? setCartQuantity(cartQuantity) : setCartQuantity(cartQuantity + 1)

    } else {
      setCart([...cart, options])
      setCartQuantity(cartQuantity + 1)
    }
  };

  return (
    <div className="home">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.productName}
          imgSrc={product.url}
          price={product.price}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
}

type ProductCardProps = {
  id: string;
  name: string;
  imgSrc: string;
  price: number;
  handler: any;
};

const ProductCard = ({
  id,
  name,
  imgSrc,
  price,
  handler,
}: ProductCardProps) => (
  <div className="productCard">
    <div>
      <img src={imgSrc} alt={name} />
    </div>
    <p>{name}</p>
    <h4>${(price / 100).toFixed(2)}</h4>
    <button onClick={() => handler({ id, name, imgSrc, price, quantity: 1 })}>
      Add to Cart
    </button>
  </div>
);

export default Home;
