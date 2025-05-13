import { Container, Main, Content } from "./style"

import { Header } from "../../components/Header/Index"
import { SideMenu } from "../../components/SideMenu"
import { ButtonText } from "../../components/ButtonText"
import { Button } from "../../components/Button"
import { Tag } from '../../components/Tags'

import { FiArrowLeft, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"
import { FaPencilAlt } from "react-icons/fa"

import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { USER_ROLES } from "../../utils/roles"

import { api } from "../../services/api"
import { useAuth } from "../../hooks/auth"

import { toast } from "react-toastify"

export function Preview() {
    const { user } = useAuth()

    const navigate = useNavigate()
    const params = useParams()

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [dishes, setDishes] = useState({})

    const [price, setPrice] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [quantity, setQuantity] = useState(1)

    const imageUrl = `${api.defaults.baseURL}/files_image_dish/${dishes.imageDish}`

    function handleAddToCart() {
        try {
            const dishLocalStorage = JSON.parse(localStorage.getItem('@food-explorer:ItemsCart')) || []

            const alreadyExists = dishLocalStorage.find(dish => dish.id === dishes.id)

            if (alreadyExists) {
                toast.warning("Esse prato já está no carrinho.")
                return
            }

            const newDish = {
                ...dishes,
                quantity,
                total: dishes.price * quantity
            }


            const payloadDishInLocalStorage = [...dishLocalStorage, newDish]

            localStorage.setItem('@food-explorer:ItemsCart', JSON.stringify(payloadDishInLocalStorage))
            window.dispatchEvent(new Event("cartChanged"))

            toast.success("Prato adicionado com sucesso")

        } catch (error) {
            toast.warning("Não foi possivel adicionar ao carrinho.")
            return
        }

    }

    function handleBack() {
        navigate(-1)
    }

    function handleEditDish() {
        navigate(`/editDish/${dishes.id}`)
    }

    function additionToCart() {
        setQuantity(prev => Math.min(10, prev + 1))
    }

    function subtraction() {
        setQuantity((prev => Math.max(1, prev - 1)))
    }


    useEffect(() => {

        try {
            async function getDish() {
                const response = await api.get(`dish/${params.id}`)
                setDishes(response.data)
            }

            getDish()

        } catch (error) {
            if (error.response?.status === 401) {
                SignOut()
            }
            if (error.response) {
                toast.error(error.response.data.message)
            }
        }

    }, [])

    useEffect(() => {

        setPrice(dishes.price)
        setIngredients(dishes.ingredients)

    }, [dishes])

    return (
        <Container>
            <Header
                onOpenMenu={() => setMenuIsOpen(true)}
                closeHeader={menuIsOpen}
            />

            <SideMenu
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
            />


            <Main>

                <ButtonText
                    onClick={handleBack}
                    icon={FiArrowLeft}
                    title="Voltar"
                    size={24}
                />

                <Content>
                    <img src={imageUrl} alt="Foto do prato" />

                    <div className="informations">

                        <p className="nameDish">{dishes.name}</p>
                        <p className="description">{dishes.description}</p>

                    </div>


                    <div className="Tags">
                        {
                            ingredients &&
                            ingredients.map(ingredient => (
                                <Tag
                                    key={String(ingredient.id)}
                                    title={ingredient.name}
                                />
                            ))
                        }

                    </div>


                    <div className="addToCart">
                        {[USER_ROLES.CUSTOMER].includes(user.role) &&
                            <div className="addAndSubtract">
                                <ButtonText
                                    icon={FiMinus}
                                    size={28}
                                    onClick={subtraction}
                                />

                                <ButtonText
                                    title={quantity}
                                />

                                <ButtonText
                                    size={28}
                                    icon={FiPlus}
                                    onClick={additionToCart}
                                />
                            </div>
                        }


                        <Button
                            className="buttonCart"
                            title={user.role === USER_ROLES.CUSTOMER ? "Incluir" : "Editar Prato"}
                            count={user.role === USER_ROLES.CUSTOMER ? `R$ ${Number(price * quantity).toFixed(2)}` : ""}
                            icon={user.role === USER_ROLES.CUSTOMER ? FiShoppingCart : FaPencilAlt}
                            onClick={user.role === USER_ROLES.ADMIN ? handleEditDish : handleAddToCart}
                        />
                    </div>



                </Content>

            </Main>




        </Container>
    )

}