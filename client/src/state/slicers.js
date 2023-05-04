import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import favReducer from "./favs";

// Store
const configuredStore = configureStore({
  reducer: {
    cart: cartReducer,
    fav: favReducer
  }
});

export default configuredStore;