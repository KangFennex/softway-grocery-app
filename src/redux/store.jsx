import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSlice,
  },
});

export default store;
