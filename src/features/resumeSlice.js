import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resumeService from "../services/resumeReadJSON";

export const fetchResume = createAsyncThunk("resume/fetchResume", async () => {
  return await resumeService.getResume();
});

const initialState = {
  name: "",
  alias: "",
  primaryEmail: "",
  contact: "",
  status: "idle",
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchResume.fulfilled, (state, action) => {
        state.status = "success";

        state.name = action.payload.name;
        state.alias = action.payload.alias;
        state.primaryEmail = action.payload.primaryEmail;
        state.contact = action.payload.contact;
      })

      .addCase(fetchResume.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default resumeSlice.reducer;
