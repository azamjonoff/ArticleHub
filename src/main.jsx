import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// redux
import { Provider } from "react-redux";

// store
import { store } from "./store.js";

// toast
import { Toaster } from "react-hot-toast";

// i18n
import "./lib/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>,
);
