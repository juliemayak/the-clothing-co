import { createSlice } from "@reduxjs/toolkit";
import scrollLocker from "@/js/scroll-locker";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: []
}

export const cartSlice = createSlice({
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
      if (state.isCartOpen) {
        state.isCartOpen = false;
        scrollLocker.unlock();
      } else {
        state.isCartOpen = true;
        scrollLocker.lock();
      }
    }
  }
})

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen
} = cartSlice.actions;

export default cartSlice.reducer;