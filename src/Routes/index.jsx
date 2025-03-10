import { BrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { ToastContainer } from 'react-toastify'

import { useAuth } from "../hooks/auth";

import { useEffect } from "react";

import { api } from "../services/api";

export function Routes() {
    const { user } = useAuth()

    return (
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            {user ? <AppRoutes /> : <AuthRoutes />}


        </BrowserRouter>

    )
}