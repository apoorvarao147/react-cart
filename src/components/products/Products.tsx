// @ts-nocheck
import "./products.scss";
import { useState, useEffect } from "react";
import AddToCartButton from "../addToCartButton/AddToCartButton";
import { Product } from "../types";
import ProgressBar from "../progressbar/ProgressBar";
import { FaSearch } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [option, setOption] = useState();

  const handleSearch = (e) => {
    const word = e.target.value;
    const filter = products.filter((product) => {
      return product.productName.toLowerCase().includes(word.toLowerCase());
    });
    setFilteredProducts(filter);
  };

  const handleSort = (e) => {
    setOption(e.target.value);
    if (e.target.value === "default") {
      setFilteredProducts(products);
    }
    if (e.target.value === "price_asc") {
      const sortedProducts = filteredProducts.sort((p1, p2) =>
        Number(p1.price) < Number(p2.price)
          ? -1
          : Number(p1.price) > Number(p2.price)
          ? 1
          : 0
      );
      setFilteredProducts(sortedProducts);
    }
    if (e.target.value === "price_desc") {
      const sortedProducts = filteredProducts.sort((p1, p2) =>
        Number(p1.price) < Number(p2.price)
          ? 1
          : Number(p1.price) > Number(p2.price)
          ? -1
          : 0
      );
      setFilteredProducts(sortedProducts);
    }
    if (e.target.value === "title_asc") {
      const sortedProducts = filteredProducts.sort((p1, p2) =>
        p1.productName.toUpperCase() < p2.productName.toUpperCase()
          ? -1
          : p1.productName.toUpperCase() > p2.productName.toUpperCase()
          ? 1
          : 0
      );
      setFilteredProducts(sortedProducts);
    }
    if (e.target.value === "title_desc") {
      const sortedProducts = filteredProducts.sort((p1, p2) =>
        p1.productName.toUpperCase() < p2.productName.toUpperCase()
          ? 1
          : p1.productName.toUpperCase() > p2.productName.toUpperCase()
          ? -1
          : 0
      );
      setFilteredProducts(sortedProducts);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/product`
      );
      const data = (await response.json()) as Product[];
      setProducts([...data]);
      setFilteredProducts([...data]);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="products">
      <div className="search">
        <button>
          <input type="text" placeholder="Search" onChange={handleSearch} />
          <FaSearch className="search-icon" />
        </button>

        <label>Sort By:</label>
        <select onChange={handleSort} value={option}>
          <option value="default">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="title_asc">Title: A to Z</option>
          <option value="title_desc">Title: Z to A</option>
        </select>
      </div>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <div className="product-image">
              <img src={product.url} alt={product.productName} />
            </div>
            <p>{product.productName}</p>
            <h4>${(product.price / 100).toFixed(2)}</h4>
            <AddToCartButton id={product.id} product={product} />
          </div>
        ))}
      </div>

      <ProgressBar />
    </>
  );
};

export default Products;
