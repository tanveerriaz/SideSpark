import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Presentation } from "./Presentation.jsx";
import "./presentation.css";

createRoot(document.getElementById("presentation-root")).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
);
