// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./State/store";
import { router } from "./routes";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;