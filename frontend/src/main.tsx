import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import StartScreen from "./components/StartScreen.tsx";
import VirtualClassCreator from "./components/VirtualClassCreator.tsx";
import LoginScreen from "./components/LoginScreen.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <StartScreen />
    },
    {
        path: "/create",
        element: <VirtualClassCreator/>
    },
    {
        path: "/join",
        element: <LoginScreen/>
    },
    {
        path: "/class",
        element: <div>Class screen</div>
    },
    {
        path: "/class/form",
        element: <div>Creating form</div>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
