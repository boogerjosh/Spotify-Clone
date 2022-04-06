import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataLayer } from "./DataLayer";
import reducer, { initialState } from "./reducer";
import "./index.css";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App /> 
    </DataLayer>
  </StrictMode>
);
