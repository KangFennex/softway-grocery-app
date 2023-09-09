import { createSelector, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // if an item already exists, prevents it from being added
      if (
        state.cart.find((item) => item.product.id === action.payload.product.id)
      ) {
        return;
      }
      state.cart.push(action.payload);
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
      }

      // apply the milk promo (get the 4th milk for free, so + 1)
      if (item?.product.name.includes("Milk")) {
        item.quantity =
          item.quantity % 3 === 0 ? item.quantity + 1 : item.quantity;
      }

      // apply the wasabi promo (Buy 2 get 1 free)
      if (item?.product.name.includes("Wasabi")) {
        item.quantity =
          item.quantity % 2 === 0 ? item.quantity + 1 : item.quantity;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove the item if there is only 1 in the cart
        state.cart = state.cart.filter(
          (item) => item.product.id !== action.payload.id
        );
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload.id
      );
    },
  },
});

const items = (state) => state.cart.cart;

export const totals = createSelector([items], (items) => {
  let subtotal = 0;
  let discount = 0;

  // locate the items with discounts
  // locate the wasabi item
  const wasabiItem = items.find((item) => item.product.name.includes("Wasabi"));

  // locate the orange item
  const orangesItem = items.find((item) =>
    item.product.name.includes("Oranges")
  );

  // locate the milk item
  const milkItem = items.find((item) => item.product.name.includes("Milk"));

  // calculate discount
  const milkDiscount = parseFloat(
    (Math.trunc((milkItem?.quantity || 0) / 4) * 3.85).toFixed(2)
  );

  // calculate discount for wasabi (Buy 2 get 1 free)
  let wasabiDiscount = 0;
  if (wasabiItem) {
    wasabiDiscount = parseFloat(
      (Math.trunc(wasabiItem?.quantity / 3) * wasabiItem.product.price).toFixed(
        2
      )
    );
  }

  // calculate discount for oranges (30% off)
  let orangesDiscount = 0;
  const orangesDiscountPercentage = 0.3;
  if (orangesItem) {
    orangesDiscount = parseFloat(
      (
        orangesDiscountPercentage *
        (orangesItem.quantity * orangesItem.product.price)
      ).toFixed(2)
    );
  }

  // calculate the total amount
  items.map((item) => {
    return (subtotal += item.quantity * item.product.price);
  });

  discount = parseFloat(
    (milkDiscount + wasabiDiscount + orangesDiscount).toFixed(2)
  );

  return {
    subtotal: parseFloat(subtotal).toFixed(2),
    discount: parseFloat(discount).toFixed(2),
    total: parseFloat(subtotal - discount).toFixed(2),
  };
});

export default cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
