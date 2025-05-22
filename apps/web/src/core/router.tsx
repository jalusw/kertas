import { createBrowserRouter } from "react-router";

import Index from "../pages";
import Notepad from "../pages/notepad";
import Layout from "../components/layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/:id",
        element: <Notepad />,
      },
    ],
  },
]);

export default router;
