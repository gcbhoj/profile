import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileMenuOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",

  initialState,

  reducers: {
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },

    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },

    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
  },
});

export const { setMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
  layoutSlice.actions;

export default layoutSlice.reducer;
