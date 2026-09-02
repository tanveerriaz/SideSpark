import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Presentation } from "./Presentation.jsx";

createRoot(document.getElementById("presentation-root")).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
);
