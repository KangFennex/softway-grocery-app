import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { totals } from "./redux/cartSlice";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const { subtotal, total, discount } = useSelector(totals);

  return (
    <article className="cart-page-container">
      <section className="cart-header">
        <h2>Your Cart</h2>
        <MdOutlineShoppingCart size={40} />
      </section>
      <div className="cart-items-container">
        <div className="cart-categories">
          <span>Your articles</span>
          <span>Quantity</span>
          <span>Total Cost</span>
        </div>
        <section className="cart-items">
          {cartItems.map((item) => {
            return (
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            );
          })}
        </section>
      </div>
      <section className="cart-transaction">
        <div className="cart-totals">
          <div>
            <h3>Subtotal</h3>
            <div>{subtotal} $</div>
          </div>
          <div>
            <h3>Discount</h3>
            <div>{discount} $</div>
          </div>
          <div>
            <h3>Total</h3>
            <div>{total} $</div>
          </div>
        </div>
        <div>
          <button className="cart-complete">Complete your order</button>
        </div>
      </section>
    </article>
  );
};

export default Cart;
