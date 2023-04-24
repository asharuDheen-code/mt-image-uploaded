import React from "react";

import { useRoutes } from "react-router-dom";
//
import ImageReSizer from "../pages/Image/ImageReSizer";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: "/", element: <ImageReSizer /> },
    { path: "*", element: <h1>Not Found</h1> },
  ]);
}
