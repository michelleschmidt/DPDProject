import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthSide from "./AuthScreen";
import DocSearch from "./DocSearchScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AuthSide />,
      },
      { path: "DocSearch", element: <DocSearch /> },
    ],
  },
]);
