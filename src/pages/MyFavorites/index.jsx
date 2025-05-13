import { Container } from "./style"

import { Header } from "../../components/Header/Index"
import { SideMenu } from "../../components/SideMenu"
import { CartItens } from '../../components/CartItens'
import { ButtonText } from "../../components/ButtonText"

import { FiArrowLeft } from "react-icons/fi"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { toast } from "react-toastify"
import Swal from 'sweetalert2'


export function MyFavorites() {
    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
    }


    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [favorites, setFavorites] = useState([])
    const [dishes, setDishes] = useState([])

    async function removeToFavorites(id) {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: "Deseja remover este prato dos favoritos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar',
            theme: "dark"
        })

        if (result.isConfirmed) {

            try {
                await api.delete(`/favorite/${id}`)
                setFavorites(prev => prev.filter(fav => fav.dish_id !== id))
            } catch (error) {
                if (error.response?.status === 401) {
                    SignOut()
                }

                if (error.response) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Não foi possivel remover dos favoritos")
                }
            }
        }
    }



    useEffect(() => {

        async function getFavoriteDish() {
            try {
                const response = await api.get("/favorite")

                setFavorites(response.data)

            } catch (error) {

                if (error.response?.status === 401) {
                    SignOut()
                }

                if (error.response) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Não foi encontrar os favoritos")
                }

            }
        }

        async function getDish() {
            try {
                const response = await api.get(`/dish`)
                setDishes(response.data)
            } catch (error) {
                if (error.response?.status === 401) {
                    SignOut()
                }

                if (error.response) {
                    toast.error(error.response.data.message)
                }

            }
        }

        getFavoriteDish()
        getDish()

    }, [])

    return (
        < Container >

            <SideMenu
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
            />

            <Header
                onOpenMenu={() => setMenuIsOpen(true)}
            />

            <main>
                <ButtonText
                    onClick={handleBack}
                    icon={FiArrowLeft}
                    title="Voltar"
                    size={24}

                />

                <h1>Meus favoritos</h1>


                <section className="Orders">
                    {
                        dishes &&
                        dishes
                            .filter(dish => favorites.some(fav => fav.dish_id === dish.id))
                            .map(item => (
                                <CartItens
                                    key={String(item.id)}
                                    data={item}
                                    onClick={() => removeToFavorites(item.id)}
                                    text="Remover dos favoritos"
                                />
                            ))

                    }
                </section>


            </main>

        </Container >
    )
}