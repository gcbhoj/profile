import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProfileAssistantName } from "../../../APIservices/flaskservices/profileAssistant";

export const fetchProfileAssistantName = createAsyncThunk(
  "profileAssistant/getName",
  async () => {
    const data = await getProfileAssistantName();

    console.log("THUNK RECEIVED:", data);

    return data;
  },
);

const initialState = {
  assistantName: "",
  status: "idle",
  error: null,
};

const profileAssistantSlice = createSlice({
  name: "profileAssistant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileAssistantName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchProfileAssistantName.fulfilled, (state, action) => {
        state.status = "success";
        state.assistantName = action.payload.assistName;
        console.log(state.assistantName);
      })

      // console.log("Assistant Name: ", initialState.assistantName)

      .addCase(fetchProfileAssistantName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default profileAssistantSlice.reducer;
