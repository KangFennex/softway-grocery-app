import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import bread from "../assets/images/bread.png";
import milk from "../assets/images/milk.png";
import butter from "../assets/images/butter.png";
import shinramyun from "../assets/images/shinramyun.jpg";
import popeye from "../assets/images/popeye.jpg";
import oranges from "../assets/images/oranges.jpg";
import wasabi from "../assets/images/wasabi.jpg";
import flowers from "../assets/images/flowers.jpg";

const InitialProducts = {
  products: [
    {
      id: nanoid(),
      name: "Pack of Five Oranges",
      image: oranges,
      description: "Five delicious and juicy oranges from California.",
      price: 5.99,
    },
    {
      id: nanoid(),
      name: "Whole French Bread",
      image: bread,
      description: "Freshly made every morning by our own bakers.",
      price: 1.99,
    },
    {
      id: nanoid(),
      name: "Flower Bouquet",
      image: flowers,
      description:
        "A bouquet of fresh and beautiful flowers fit for any occasions.",
      price: 6.99,
    },
    {
      id: nanoid(),
      name: "Wasabi",
      image: wasabi,
      description: "Fresh Japanese wasabi paste for dipping with sushi.",
      price: 3.99,
    },
    {
      id: nanoid(),
      name: "Milk",
      image: milk,
      description:
        "Semi skimmed milk that comes straight from the Alpes farmers.",
      price: 3.85,
    },
    {
      id: nanoid(),
      name: "Butter",
      image: butter,
      description: "Produced by us to insure high quality butter.",
      price: 2.97,
    },
    {
      id: nanoid(),
      name: "Popeye Candy Sticks",
      image: popeye,
      description:
        "Retro white candy sticks made out of powdery, chalky sugar.",
      price: 9.99,
    },
    {
      id: nanoid(),
      name: "Shin Ramyun",
      image: shinramyun,
      description:
        "A cup version of ramen that will please the most daring palates!",
      price: 4.99,
    },
  ],
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState: InitialProducts,
  reducers: {
    addProducts: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export default ProductsSlice.reducer;
export const { addProduct } = ProductsSlice.actions;
