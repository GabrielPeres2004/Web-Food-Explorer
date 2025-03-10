import { createContext, useContext, useEffect, useState } from "react";
import { api } from '../services/api'
import { toast } from 'react-toastify';


const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({})
    const [message, setMessage] = useState("")

    async function SignUp({ name, email, password }) {

        try {

            await api.post('/user', { name, email, password })

            toast.success("Usuário cadastrado com sucesso")

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


    useEffect(() => {
        const user = localStorage.getItem('@food-explorer:user')


        if (user) {
            setData({
                user: JSON.parse(user)
            })
        }

    }, [])

    return (
        <AuthContext.Provider value={{
            SignUp,
            SignIn,
            SignOut,
            user: data.user,
            message
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