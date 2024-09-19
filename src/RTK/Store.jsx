import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./Slices/ProductsSlice";
import cartSlice from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    proudcts: ProductsSlice,
    cart: cartSlice,
},
});
