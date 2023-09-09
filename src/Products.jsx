import Product from "./Product";
import { useSelector } from "react-redux";

const Products = () => {
  const { products } = useSelector((state) => state.products);

  return (
    <article className="products-page-container">
      <h2>Products</h2>
      <div className="products-container">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              rating={product.rating}
              price={product.price}
            />
          );
        })}
      </div>
    </article>
  );
};

export default Products;
