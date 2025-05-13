import { createContext, useContext, useEffect, useState } from "react";
import { api } from '../services/api'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({})

    async function SignUp({ name, email, password }) {
        try {

            const response = await api.post('/user', { name, email, password })

            toast.success(response.data.message)

            return true

        } catch (error) {

            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Não foi possivel cadastrar o usúario")
            }

            return false

        }

    }

    async function SignIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password })

            const { user } = response.data

            localStorage.setItem('@food-explorer:user', JSON.stringify(user))

            setData({ user })


        } catch (error) {

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Não foi possivel autenticar o usúario")
            }

        }

    }

    async function SignOut() {
        localStorage.removeItem('@food-explorer:user')

        setData({})

    }

    async function updatedProfile({ user, avatarFile }) {
        try {

            if (avatarFile) {

                const fileUploadForm = new FormData()

                fileUploadForm.append("avatar", avatarFile)

                const response = await api.patch('/user/avatar', fileUploadForm)

                user.avatar = response.data.user.avatar

            }

            const response = await api.put('/user', user)
            const updatedUser = await api.get('/user/validated')

            setData({ user: updatedUser.data });

            localStorage.setItem('@food-explorer:user', JSON.stringify(updatedUser.data))

            Swal.fire({
                title: response.data.message,
                icon: "success",
                draggable: true,
                theme: 'dark'
            });

        } catch (error) {
            if (error.response?.status === 401) {
                SignOut()
            }
            else if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Não foi possível atualizar o usuário.")
            }


        }
    }


    useEffect(() => {
        try {
            const userLocalStorage = localStorage.getItem('@food-explorer:user')


            if (userLocalStorage) {
                setData({
                    user: JSON.parse(userLocalStorage)
                })
            }

        } catch (error) {
            if (error.response?.status === 401) {
                SignOut()
            }
        }

    }, [])

    return (
        <AuthContext.Provider value={{
            SignUp,
            SignIn,
            SignOut,
            updatedProfile,
            user: data.user
        }}>
            {children}
        </AuthContext.Provider>

    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}


export { AuthProvider, useAuth }