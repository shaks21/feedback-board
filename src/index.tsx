import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import AppRoutes from "./AppRoutes";
import FeedbackContextProvider from "./context/FeedbackContextProvider";
import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider>
      <FeedbackContextProvider>
        <AppRoutes />
      </FeedbackContextProvider>
    </Provider>
  </StrictMode>
);
