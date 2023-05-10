import { createSlice } from "@reduxjs/toolkit";
import CartMenu from '@/js/cart-menu';

const initialState = {
  isCartOpen: false,
  cart: [],
  items: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.item.id);
      if (existingItem) {
        state.cart = state.cart.map(item => {
          if (item.id === action.payload.item.id) {
            item.count += action.payload.item.count;
          }
          return item;
        });
      } else {
        state.cart = [...state.cart, action.payload.item];
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      })
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item
      })
    },

    setIsCartOpen: (state) => {
      const cartMenu = new CartMenu();

      if (state.isCartOpen) {
        state.isCartOpen = false;
        cartMenu.closeCartMenu();
      } else {
        state.isCartOpen = true;
        cartMenu.openCartMenu();
      }
    },

    clearCart: (state) => {
      state.cart = [];
    }
  }
})

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;