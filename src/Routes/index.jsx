import { BrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";
import { AdminRoutes } from "./admin.routes";
import { CustomerRoutes } from "./customer.routes";

import { ToastContainer } from 'react-toastify'

import { useEffect } from "react";

import { useAuth } from "../hooks/auth";
import { api } from "../services/api";

import { USER_ROLES } from "../utils/roles";

export function Routes() {
    const { user, SignOut } = useAuth()

    function AcessRoutes() {
        switch (user.role) {
            case USER_ROLES.ADMIN:
                return <AdminRoutes />
            case USER_ROLES.CUSTOMER:
                return <CustomerRoutes />
            default:
                return <CustomerRoutes />
        }

    }

    useEffect(() => {
        api.get('/user/validated')
            .catch((error) => {
                if (error.response?.status === 401) {
                    SignOut()
                }
            })

    }, [])

    return (
        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />

            {user ? <AcessRoutes /> : <AuthRoutes />}


        </BrowserRouter>

    )
}