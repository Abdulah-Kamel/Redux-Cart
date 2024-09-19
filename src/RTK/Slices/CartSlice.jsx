import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Helper function to update localStorage
const updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Retrieve the cart from localStorage if it exists, otherwise set to an empty array
const getInitialCartState = () => {
  const cartFromStorage = localStorage.getItem("cart");
  return cartFromStorage ? JSON.parse(cartFromStorage) : [];
};

export const cartSlice = createSlice({
  name: "cart",
  // Set initialState to the value retrieved from localStorage or empty array
  initialState: getInitialCartState(),
  reducers: {
    addToCart: (state, action) => {
      const findedProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (findedProduct) {
        findedProduct.quantity += 1;
        toast.success("Product quantity increased");
      } else {
        const productClone = { ...action.payload, quantity: 1 };
        state.push(productClone);
        toast.success("Product added to cart");
      }
      updateLocalStorage(state); // Update localStorage after the state change
    },
    deleteFromCart: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload);
        state.splice(index, 1); // Remove product by id
        toast.warning("Product deleted");
        updateLocalStorage(state); // Update localStorage after the state change
    },
    clearCart: (state) => {
      toast.success("Cart cleared");
      updateLocalStorage([]); // Clear localStorage
      return []; // Clear cart state
    },
  },
  extraReducers: () => {},
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
