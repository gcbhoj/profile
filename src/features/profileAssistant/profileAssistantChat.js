import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  initializeNewChat,
  postNewQuery,
  getChatHistory,
} from "../../../APIservices/flaskservices/profileAssistant";

const initialState = {
  currentRequest: "",
  currentResponse: "",
  currentAudio: null,
  currentChatId: null,
  firstMessage: "",
  firstAudio: null,
  chatHistory: [],
  status: "idle",
  error: null,
};

// ------------------------------------
// Initialize New Chat
// ------------------------------------
export const initNewChat = createAsyncThunk(
  "profileAssistant/newChat",
  async () => {
    const data = await initializeNewChat();

    return data;
  },
);

// ------------------------------------
// Post New Query
// ------------------------------------
export const startConversation = createAsyncThunk(
  "profileAssistant/postQuery",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const currentRequest = state.profileAssistantChat.currentRequest;

    const currentSessionId = state.profileAssistantChat.currentChatId;

    if (!currentRequest.trim()) {
      return;
    }

    const data = await postNewQuery(currentSessionId, currentRequest);


    return data;
  },
);

// ------------------------------------
// Retrieve Chat History
// ------------------------------------
export const fetchChatHistory = createAsyncThunk(
  "profileAssistant/chatHistory",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const sessionId = state.profileAssistantChat.currentChatId;

    if (!sessionId) {
      throw new Error("Chat session ID is not available.");
    }

    const response = await getChatHistory(sessionId);

    console.log("Chat History data:", response);

    return response;
  },
);

// ------------------------------------
// Slice
// ------------------------------------
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

      // ------------------------------------
      // Initialize New Chat
      // ------------------------------------

      .addCase(initNewChat.pending, (state) => {
        state.status = "waiting for response";
        state.error = null;
      })

      .addCase(initNewChat.fulfilled, (state, action) => {
        // console.log("FULFILLED PAYLOAD:", action.payload);

        state.status = "success";

        state.currentChatId = action.payload.sessionId;

        state.firstMessage = action.payload.initialMessage;

        state.firstAudio = action.payload.initialAudio;
      })

      .addCase(initNewChat.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })

      // ------------------------------------
      // Post New Query
      // ------------------------------------

      .addCase(startConversation.pending, (state) => {
        state.status = "waiting for response";
        state.error = null;
      })

      .addCase(startConversation.fulfilled, (state, action) => {
        console.log("POST QUERY FULFILLED PAYLOAD:", action.payload);

        state.status = "success";

        state.currentResponse = action.payload.message;

        state.currentAudio = action.payload.audio;
      })

      .addCase(startConversation.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })

      // ------------------------------------
      // Retrieve Chat History
      // ------------------------------------

      .addCase(fetchChatHistory.pending, (state) => {
        state.status = "waiting for response";
        state.error = null;
      })

      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        console.log("CHAT HISTORY FULFILLED PAYLOAD:", action.payload);

        state.status = "success";

        state.chatHistory = action.payload.data.history;
        console.log("PAY LOAD:", action.payload);
      })

      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      });
  },
});

export const { setRequest, clearRequest } = profileAssistantChatSlice.actions;

export default profileAssistantChatSlice.reducer;
