//@ts-nocheck
import "../styles/home.scss";
import {useState, useEffect} from 'react';

function Home({cart, setCart}) {

  const[products, setProducts] = useState<any>([])

  // const[cart, setCart] = useState<any>([])

  useEffect(() => {
    const fetchData = async() => {
      let data = await fetch(`${process.env.REACT_APP_BACKEND_API}/product`);
      data = await data.json()
      setProducts(data)
    }
    fetchData();
},[])

  
  const addToCartHandler = (options: any) => {
    setCart([...cart, options])
    // console.log(cart);
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
  handler: any
}

const ProductCard = ({ id, name, imgSrc, price, handler }: ProductCardProps) => (
  <div className="productCard">
    <div>
      <img src={imgSrc} alt={name} />
    </div>
    <p>{name}</p>
    <h4>${(price/100).toFixed(2)}</h4>
    <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
      Add to Cart
    </button>
  </div>
);

export default Home;
