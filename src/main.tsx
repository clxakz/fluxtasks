import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Layout from "./layout.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import TodoProvider from "@/components/TaskProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TodoProvider>
        <Layout>
          <App />
        </Layout>
      </TodoProvider>
    </ThemeProvider>
  </React.StrictMode>
);
