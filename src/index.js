// General React imports
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./components/redux/redux_store";

// Project specific files
import App from "./app";

// CSS files
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
