import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {BookingProvider} from "./components/BookingContext";

ReactDOM.render(
  <React.StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
