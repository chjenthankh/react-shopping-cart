import React, { useState } from "react";
import formatCurrentcy from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

function Product({ products, addToCart }) {
  const [productModal, setProductModal] = useState(null);

  const openModal = (product) => {
    setProductModal(product);
  };
  const closeModal = () => {
    setProductModal(null);
  };
  return (
    <div>
      <Fade bottom cascade={true}>
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={`#${product._id}`}>
                  <img
                    src={require(`../assets${product.image}`)}
                    alt={product.title}
                    onClick={() => openModal(product)}
                  />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div> {formatCurrentcy(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {productModal && (
        <Modal isOpen={true}>
          <Zoom>
            <button className="close-modal" onClick={() => closeModal()}>
              X
            </button>
            <div className="product-details">
              <img src={productModal.image} alt={productModal.title} />
              <div className="product-details-description">
                <p>
                  <strong>{productModal.title}</strong>
                </p>
                <p>{productModal.description}</p>
                <p className="product-size">
                  Availble Sizes:
                  {productModal.availableSizes.map((el) => (
                    <span>
                      <button className="button">{el}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrentcy(productModal.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      addToCart(productModal);
                      closeModal();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
}

export default Product;
