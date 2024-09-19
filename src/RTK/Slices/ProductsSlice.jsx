import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();
    return data;
  }
);

// Initial state: includes both the product list and a single product
const initialState = {
  loading: "idle",
  productsList: [],
  singleProduct: null, // Holds a single product fetched by ID
};

// Slice to manage product states
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productsList = action.payload; // Set all products
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.singleProduct = action.payload; // Set the single product by ID
      });
  },
});

// Export the reducer for store configuration
export default productsSlice.reducer;
