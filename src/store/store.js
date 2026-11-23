import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
  },
});

// Bonus: persist cart and wishlist in LocalStorage.
store.subscribe(() => {
  try {
    const { cart, wishlist } = store.getState();
    localStorage.setItem("cart", JSON.stringify(cart.items));
    localStorage.setItem("wishlist", JSON.stringify(wishlist.items));
  } catch {
    /* storage unavailable – ignore */
  }
});
