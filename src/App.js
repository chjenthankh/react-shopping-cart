import React, { useEffect, useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Product from "./components/Product";
import data from "./data.json";
import axios from "axios";

function App() {
  //State
  const [size, setSize] = useState("All");
  const [sort, setSort] = useState("Lastest");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Use Effect
  useEffect(() => {
    loadCartItems();
    const fetchData = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    saveCartItems();
  }, [cartItems]);
  useEffect(() => {
    sortProducts();
  }, [sort]);
  useEffect(() => {
    filterProducts();
  }, [size]);

  //Handle Event
  const filterProducts = () => {
    if (size === "All") {
      setProducts(data.products);
    } else {
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(size) >= 0
        )
      );
    }
  };
  const sortProducts = () => {
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === "Lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "Highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        )
    );
  };
  const addToCart = (product) => {
    const cartItem = cartItems.slice();
    let alreadyInCart = false;
    cartItem.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }
    setCartItems(cartItem);
  };
  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id));
  };
  const saveCartItems = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const loadCartItems = () => {
    if (localStorage.getItem("cartItems") === null) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    } else {
      let localCartItems = JSON.parse(localStorage.getItem("cartItems"));
      setCartItems(localCartItems);
    }
  };
  const createOrder = (order) => {
    console.log(order);
  };

  //Render
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              setSize={setSize}
              setSort={setSort}
            />
            <Product
              setProducts={setProducts}
              products={products}
              addToCart={addToCart}
            />
          </div>

          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;
