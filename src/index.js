import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind resides here
import App from "./App";

window.addEventListener("error", (event) => {
  document.body.innerHTML = `<div style="color:red;padding:20px;"><h1>Global Error Caught:</h1><pre>${event.error?.stack || event.message}</pre></div>`;
});
window.addEventListener("unhandledrejection", (event) => {
  document.body.innerHTML = `<div style="color:red;padding:20px;"><h1>Unhandled Promise Rejection:</h1><pre>${event.reason?.stack || event.reason}</pre></div>`;
});

try {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (error) {
  document.body.innerHTML = `<div style="color:red;padding:20px;"><h1>Synchronous Render Error:</h1><pre>${error.stack || error.message}</pre></div>`;
}
