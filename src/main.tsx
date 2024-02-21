import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: ":category",
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: ":spec",
        element: <App />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/specs",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
