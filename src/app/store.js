import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import resumeReducer from "../features/resumeSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    resume: resumeReducer,
  },
});
