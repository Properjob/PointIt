import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { PouchDB } from "react-pouchdb";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PouchDB name="estimates">
      <Suspense fallback="loading...">
        <App />
      </Suspense>
    </PouchDB>
  </React.StrictMode>
);
