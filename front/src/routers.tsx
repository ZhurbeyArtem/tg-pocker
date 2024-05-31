import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import UIPage from "./pages/ui/UIPage";
import SDKPage from "./pages/sdk/SDKPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/ui",
    element: <UIPage />,
  },
  {
    path: "/sdk",
    element: <SDKPage />,
  },
])