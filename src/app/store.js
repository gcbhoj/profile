import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import resumeReducer from "../features/resumeSlice";
import layoutReducer from "../features/layoutSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    resume: resumeReducer,
    layout: layoutReducer,
  },
});
