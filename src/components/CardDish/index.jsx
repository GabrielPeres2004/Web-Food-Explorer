import { Container } from "./style";

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";

import 'animate.css';

import { ButtonText } from '../ButtonText'
import { Button } from '../Button'


import { USER_ROLES } from "../../utils/roles";


import { useNavigate } from "react-router-dom";


import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

import { useState, useEffect } from "react";

import { toast } from "react-toastify"


export function CardDish({ data, isFavorite, ...rest }) {
    const navigate = useNavigate()
    const { user, SignOut } = useAuth()

    const imageUrl = `${api.defaults.baseURL}/files_image_dish/${data.imageDish}`

    const [favorite, setFavorite] = useState(isFavorite || false)
    const [quantity, setQuantity] = useState(1)

    function handlePreviewDish() {
        navigate(`/preview/${data.id}`)
    }

    function additionToCart() {
        setQuantity(prev => Math.min(10, prev + 1))
    }

    function subtraction() {
        setQuantity((prev => Math.max(1, prev - 1)))
    }

    function handleAddToCart() {
        const dishLocalStorage = JSON.parse(localStorage.getItem('@food-explorer:ItemsCart')) || []

        const alreadyExists = dishLocalStorage.find(dish => dish.id === data.id)

        if (alreadyExists) {
            toast.warning("Esse prato já está no carrinho.")
            return
        }

        const newDish = {
            ...data,
            quantity,
            total: data.price * quantity
        }

        const payloadDishInLocalStorage = [...dishLocalStorage, newDish]

        localStorage.setItem('@food-explorer:ItemsCart', JSON.stringify(payloadDishInLocalStorage))
        window.dispatchEvent(new Event("cartChanged"))

        toast.success("Prato adicionado com sucesso")
    }

    async function addToFavorites() {

        try {
            setFavorite(true)
            await api.post(`/favorite/${data.id}`)

        } catch (error) {
            setFavorite(false)
            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Não foi possivel adicionar aos favoritos")
            }
        }
    }

    async function removeToFavorites() {

        try {
            setFavorite(false)
            await api.delete(`/favorite/${data.id}`)

        } catch (error) {
            setFavorite(true)

            if (error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Não foi possivel remover aos favoritos")
            }
        }
    }


    return (
        <Container>

            <div id="favorite">

                {[USER_ROLES.CUSTOMER].includes(user.role) &&
                    (favorite ? (
                        <FaHeart
                            onClick={removeToFavorites}
                            id="removeTofavorites"
                            color="red"
                            size={20}
                        />
                    ) : (
                        <FaRegHeart
                            onClick={addToFavorites}
                            id="addTofavorites"
                            color="white"
                            size={20}
                        />
                    ))
                }

                {[USER_ROLES.ADMIN].includes(user.role) &&
                    <FaPencilAlt
                        id="editDish"
                        onClick={() => navigate(`/editDish/${data.id}`)}
                    />
                }

            </div>


            <img
                src={imageUrl}
                alt="Imagem do prato" id="DishImage"
                onClick={handlePreviewDish}
            />

            <p onClick={handlePreviewDish} id="nameDish">{data.name}</p>

            <p id={data.active === 0 ? "desactiveDish" : "description"}>{
                data.active === 0
                    ? "Prato Desativado"
                    : data.description
            }</p>

            <span>R$ {Number(data.price * quantity).toFixed(2)}</span>

            {[USER_ROLES.CUSTOMER].includes(user.role) &&
                <div id="addToCart">
                    <ButtonText
                        icon={FiMinus}
                        size={20}
                        onClick={subtraction}
                    />

                    <ButtonText
                        title={quantity}
                    />

                    <ButtonText
                        size={20}
                        icon={FiPlus}
                        onClick={additionToCart}
                    />
                </div>
            }


            {[USER_ROLES.CUSTOMER].includes(user.role) &&
                <Button
                    id='buttonInclude'
                    title='Incluir'
                    onClick={handleAddToCart}
                />
            }






        </Container>
    )
}