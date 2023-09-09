import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  return (
    <nav>
      <div className="navbar">
        <Link to="/" className="navbar-logo">
          <h2>Softway</h2>
        </Link>
        <Link to="/products" className="navbar-products">
          <h3>Browse products</h3>
        </Link>
        <Link to="/cart" className="navbar-items">
          <MdOutlineShoppingCart size={35} className="navbar-icon" />
          <span className="nmb-items">{cartItems.length}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
