import { useDispatch } from "react-redux";
import { removeFromCart } from "./redux/cartSlice";
import { incrementQuantity, decrementQuantity } from "./redux/cartSlice";
import { LuTrash } from "react-icons/lu";

const CartItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  return (
    <>
      <article className="cart-item">
        <section className="cart-info">
          <div>
            <img src={product.image} alt="item" />
          </div>
          <div className="cart-details">
            <h3>{product.name}</h3>
            <h4>{product.price} $ each</h4>
          </div>
        </section>
        <section className="cart-buttons">
          <div className="remove-button">
            <LuTrash size={15} />
            <button
              onClick={() => dispatch(removeFromCart({ id: product.id }))}
            >
              Remove
            </button>
          </div>
          <div className="quantity-buttons">
            <button
              onClick={() => {
                dispatch(decrementQuantity({ id: product.id }));
              }}
            >
              -
            </button>
            <div className="cart-quantity">{quantity}</div>
            <button
              onClick={() => {
                dispatch(incrementQuantity({ id: product.id }));
              }}
            >
              +
            </button>
          </div>
          <div className="item-total-cost">
            {(quantity * product.price).toFixed(2)} $
          </div>
        </section>
      </article>
    </>
  );
};

export default CartItem;
