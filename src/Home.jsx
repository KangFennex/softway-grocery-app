import promo from "./assets/images/promo.png";
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";

const promos = [
  {
    promo: "Buy 2 wasabi and get the 3rd for free",
  },
  {
    promo: "30% off the pack of oranges",
  },
  {
    promo: "Buy 3 milks and get the 4th milk for free",
  },
];

const Home = () => {
  return (
    <div>
      <article className="home-container">
        <section className="promo-lead">
          <h2>Softway</h2>
          <img src={promo} alt="promo" />
        </section>
        <section className="promos">
          {promos.map((promo) => {
            return (
              <div className="promo">
                <AiOutlineStar size={20} />
                <h3>{promo.promo}</h3>
              </div>
            );
          })}
        </section>
        <section>
          <Link to="/products">
            <button className="browse-button">Browse products</button>
          </Link>
        </section>
      </article>
    </div>
  );
};

export default Home;
