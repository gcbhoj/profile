import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: null,
  longitude: null,
  city: null,
};

export const locationSlice = createSlice({
  name: "location",

  initialState,

  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.city = action.payload.city;
    },

    clearLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.city = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
