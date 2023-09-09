import "./App.css";
import Products from "./Products";
import Navbar from "./components/Navbar";
import Cart from "./Cart";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="hero">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
