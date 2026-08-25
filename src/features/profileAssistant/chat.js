import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { initializeNewChat } from "../../../APIservices/flaskservices/profileAssistant";

export const initNewChat = createAsyncThunk(
  "profileAssistant/newChat",
  async () => {
    const data = await initializeNewChat();

    console.log("NEW CHAT RESPONSE:", data);

    return data;
  },
);

const initialState = {
  currentRequest: "",
  currentResponse: "",
  currentChatId: null,
  firstMessage: "",
  firstAudio: null,
  status: "idle",
  error: null,
};

const profileAssistantChatSlice = createSlice({
  name: "profileAssistantChat",
  initialState,

  reducers: {
    setRequest: (state, action) => {
      state.currentRequest = action.payload;
    },

    clearRequest: (state) => {
      state.currentRequest = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initNewChat.pending, (state) => {
        state.status = "waiting for response";
        state.error = null;
      })

      .addCase(initNewChat.fulfilled, (state, action) => {
        console.log("FULFILLED PAYLOAD:", action.payload);

        state.status = "success";
        state.currentChatId = action.payload.sessionId;
        state.firstMessage = action.payload.initialMessage;
        state.firstAudio = action.payload.initialAudio;
      })

      .addCase(initNewChat.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      });
  },
});

export const { setRequest, clearRequest } = profileAssistantChatSlice.actions;

export default profileAssistantChatSlice.reducer;
