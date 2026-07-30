// features/counterSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { counterService } from "../services/counterService";

// Generate a random ID unique to this tab session runtime
const TAB_ID = "tab_" + Math.random().toString(36).substring(2, 9);
let channel = null;

// Local mapping of open tabs on this specific machine
let localTabRegistry = { [TAB_ID]: Date.now() };
let isMasterTab = false;

export const updateDatabaseCounter = createAsyncThunk(
  "counter/updateDatabase",
  async (isNewUser, { rejectWithValue }) => {
    try {
      // We send a boolean flag to the service layer.
      // If isNewUser is true, the backend increments the user counter.
      // If false, the backend knows it's an existing user opening another tab.
      // return await counterService.syncInstanceCount({ isNewUser });
      console.log(isNewUser);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    activeInstances: 1,
    isMaster: false,
    status: "idle",
  },
  reducers: {
    syncState: (state, action) => {
      state.activeInstances = action.payload.count;
      state.isMaster = action.payload.isMaster;
    },
  },
});

export const { syncState } = counterSlice.actions;

export const initializeTabTracker = () => (dispatch) => {
  if (typeof window === "undefined" || channel) return;

  // 1. Check if this is a brand new user or an existing user opening a new tab
  let isNewUser = false;
  const storageKey = "app_user_installation_id";
  let userInstallationId = localStorage.getItem(storageKey);

  if (!userInstallationId) {
    // No ID found in localStorage -> This is a completely new user
    isNewUser = true;
    userInstallationId = "usr_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(storageKey, userInstallationId);
  }

  channel = new BroadcastChannel("db_counter_sync");

  const evaluateAndDispatchState = (shouldTriggerDbUpdate = false) => {
    const now = Date.now();

    // Purge dead tab keys
    Object.keys(localTabRegistry).forEach((id) => {
      if (id !== TAB_ID && now - localTabRegistry[id] > 4000) {
        delete localTabRegistry[id];
      }
    });

    const activeTabIds = Object.keys(localTabRegistry).sort();
    const currentCount = activeTabIds.length;

    const checkAmIMaster = activeTabIds[0] === TAB_ID;
    isMasterTab = checkAmIMaster;

    dispatch(syncState({ count: currentCount, isMaster: isMasterTab }));

    // Only update the database if this tab is the Master and it's an intentional lifecycle event
    if (isMasterTab && shouldTriggerDbUpdate) {
      // Pass the flag down: true only if this machine has never opened the app before
      dispatch(updateDatabaseCounter(isNewUser));

      // Flip the flag to false immediately after the initial load sync,
      // because subsequent events on this machine are definitely the same user.
      isNewUser = false;
    }
  };

  // Heartbeat loop to maintain cross-tab orchestration
  setInterval(() => {
    localTabRegistry[TAB_ID] = Date.now();
    channel.postMessage({ type: "HEARTBEAT", sender: TAB_ID });
    evaluateAndDispatchState(false);
  }, 2000);

  // Announce presence immediately on load and request a DB check-in
  channel.postMessage({ type: "HEARTBEAT", sender: TAB_ID });
  evaluateAndDispatchState(true);

  channel.onmessage = (event) => {
    const { type, sender } = event.data;
    if (sender === TAB_ID) return;

    switch (type) {
      case "HEARTBEAT":
        localTabRegistry[sender] = Date.now();
        evaluateAndDispatchState(false);
        break;

      case "TAB_DEPARTED":
        delete localTabRegistry[sender];
        evaluateAndDispatchState(false);
        break;
    }
  };

  window.addEventListener("beforeunload", () => {
    channel.postMessage({ type: "TAB_DEPARTED", sender: TAB_ID });
    channel.close();
  });
};

export default counterSlice.reducer;
