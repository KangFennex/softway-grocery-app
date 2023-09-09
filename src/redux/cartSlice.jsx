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

      if (item?.product.name.includes("milk")) {
        item.quantity =
          item.quantity % 3 === 0 ? item.quantity + 1 : item.quantity;
      }

      // apply the wasabi promo (Buy 1 get 1 free)
      if (item?.product.name.includes("wasabi")) {
        if (item.quantity % 2 === 0) {
          item.quantity += 1;
        }
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        // remove the item if there is only 1 in the cart
        if (item.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => item.product.id !== action.payload.id
          );
          return;
        }
        item.quantity -= 1;
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

  // locate the wasabi item
  const wasabiItem = items.find((item) => item.product.name.includes("wasabi"));

  // locate the orange item
  const orangesItem = items.find((item) =>
    item.product.name.includes("oranges")
  );

  // locate the butter item
  const butterItem = items.find((item) => item.product.name.includes("butter"));

  // locate the milk item
  const milkItem = items.find((item) => item.product.name.includes("milk"));

  // calculate discount
  const milkDiscount = parseFloat(
    (Math.trunc((milkItem?.quantity || 0) / 4) * 3.85).toFixed(2)
  );

  // calculate discount for wasabi (Buy 1 get 1 free)
  let wasabiDiscount = 0;
  if (wasabiItem) {
    wasabiDiscount = parseFloat(
      (Math.trunc(wasabiItem?.quantity / 2) * wasabiItem.product.price).toFixed(
        2
      )
    );
  }

  // calculate discount for oranges (30% off)
  let orangesDiscount = 0;
  if (orangesItem) {
    orangesDiscount = parseFloat(
      (0.3 * orangesItem.quantity * orangesItem.product.price).toFixed(2)
    );
  }

  // apply the butter discount only if there is bread in the cart
  let butterDiscount = 0;
  if (items.find((item) => item.product.name.includes("bread"))) {
    butterDiscount = parseFloat(
      (Math.trunc((butterItem?.quantity || 0) / 2) * (1.99 * 0.5)).toFixed(2)
    );
  }

  // calculate the total amount
  items.map((item) => {
    return (subtotal += item.quantity * item.product.price);
  });

  discount = parseFloat(
    (milkDiscount + butterDiscount + wasabiDiscount + orangesDiscount).toFixed(
      2
    )
  );

  return {
    subtotal: parseFloat(subtotal).toFixed(2),
    discount,
    milkDiscount,
    butterDiscount,
    wasabiDiscount,
    orangesDiscount,
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
