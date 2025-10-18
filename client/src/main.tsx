import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes/app.routes";
import { ThemeProvider } from '@store/Theme.provider';
import { TokenProvider } from '@store/Token.provider';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TokenProvider>
        <RouterProvider router={router} />
      </TokenProvider>
    </ThemeProvider>
  </StrictMode>
);
