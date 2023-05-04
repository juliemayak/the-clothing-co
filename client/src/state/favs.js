import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  highlights: []
}

export const favSlice = createSlice({
  name: "highlights",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const existingItem = state.highlights.find(item => item.id === action.payload.item.id);
      if (existingItem) {
        return;
      } else {
        state.highlights = [...state.highlights, action.payload.item];
      }
    },
    removeFromFavorites: (state, action) => {
      state.highlights = state.highlights.filter(item => item.id !== action.payload.item.id);
    }
  }
})

export const { addToFavorites, removeFromFavorites } = favSlice.actions;
const favReducer = favSlice.reducer;

export default favReducer;