import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import "./index.css"
import App from "./App";
import Home from "./Pages/HomePage";
import Create from "./Pages/CreatePage";
import Note from "./Pages/NoteDetailPage";

// Define routes using createBrowserRouter
const appRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App wraps NavBar + Outlet
        children: [
            { path: "/", element: <Home /> },
            { path: "/create", element: <Create /> },
            { path: "/note/:id", element: <Note /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={appRoutes} />
        <Toaster />
    </React.StrictMode>
);
