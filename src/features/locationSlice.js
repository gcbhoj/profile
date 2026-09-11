import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setGeoLocation } from "../../APIservices/flaskservices/profileAssistant";

const initialState = {
  latitude: null,
  longitude: null,
  status: "idle",
  error: null,
};

export const setUserLocation = createAsyncThunk(
  "clientLocation/setLocation",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const userLatitude = state.clientLocation.latitude;
    const userLongitude = state.clientLocation.longitude;

    const response = await setGeoLocation(userLatitude, userLongitude);

    return response;
  },
);

export const locationSlice = createSlice({
  name: "clientLocation",

  initialState,

  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },

    clearLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
