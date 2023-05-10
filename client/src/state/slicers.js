import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cart";
import favReducer from "./favs";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["cart", "fav"],
  stateReconciler: autoMergeLevel2
};

const cartPersistConfig = {
  key: "cart",
  storage,
  blacklist: ["items"],
}
const favPersistConfig = {
  key: "fav",
  storage,
}

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  fav: persistReducer(favPersistConfig, favReducer)
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Store
export const configuredStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const configuredPersistor = persistStore(configuredStore);

