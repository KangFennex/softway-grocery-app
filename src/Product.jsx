import "./App.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import { useState } from "react";

const Product = ({ id, name, image, description, rating, price }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(0);

  const handleQuantitySelect = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleBuyClick = () => {
    dispatch(
      addToCart({
        product: { id, name, image, price, rating },
        quantity: selectedValue ? parseFloat(selectedValue) : 1,
      })
    );
  };

  return (
    <section className="product">
      <div className="product-img-container">
        <img src={image} alt={name} className="product-img" />
      </div>
      <div className="product-content">
        <div className="product-description">
          <h3>{name}</h3>
          <h4>{description}</h4>
        </div>
        <div className="product-details">
          <div>{rating}</div>
          <div>$ {price}</div>
          <button className="product-button" onClick={handleBuyClick}>
            BUY
          </button>
          <select
            onChange={handleQuantitySelect}
            value={selectedValue}
            class="quantity-select"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Product;
