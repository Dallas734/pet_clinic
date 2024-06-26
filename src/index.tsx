import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/styles/index.scss";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { StoreProvider } from "./app/providers/StoreProvider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./app/providers/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>
);
