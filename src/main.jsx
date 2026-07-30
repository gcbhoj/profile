import React from "react";
import { createRoot } from "react-dom/client";
import "./scss/styles.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { initializeTabTracker } from "./features/counterSlice.js";

import * as bootstrap from "bootstrap";

const root = createRoot(document.getElementById("root"));

store.dispatch(initializeTabTracker());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
