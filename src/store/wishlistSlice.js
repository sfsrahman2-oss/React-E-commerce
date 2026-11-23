import { createSlice } from "@reduxjs/toolkit";

export const loadWishlist = () => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: loadWishlist() },
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const exists = state.items.some((i) => i.id === product.id);
      state.items = exists
        ? state.items.filter((i) => i.id !== product.id)
        : [...state.items, product];
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
