import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import router from "./core/router";

import "@radix-ui/themes/styles.css";
import "./styles/globals.css";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme appearance="light">
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>
);
