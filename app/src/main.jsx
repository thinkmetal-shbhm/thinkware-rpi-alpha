import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="534463592373-oh94nlm9k9kudhijehikl6v1leqjo0m9.apps.googleusercontent.com">
        
    <Router>
      <App />
    </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
