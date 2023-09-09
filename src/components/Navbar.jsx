import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  return (
    <nav>
      <div className="navbar">
        <Link to="/">
          <h2>Softway</h2>
        </Link>
        <Link to="/cart">
          <MdOutlineShoppingCart />
          <span id="nmb-items">{cartItems.length}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
