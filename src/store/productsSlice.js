import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://fakestoreapi.com";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API}/products`),
        fetch(`${API}/products/categories`),
      ]);
      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Server responded with an error.");
      }
      const [items, categories] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
      ]);
           const RATE = 120; // change to your rate
      const converted = items.map((p) => ({
        ...p,
        price: Math.round(p.price * RATE),
      }));
      return { items: converted, categories };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load products.");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], categories: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.categories = action.payload.categories;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load products.";
      });
  },
});

export default productsSlice.reducer;
