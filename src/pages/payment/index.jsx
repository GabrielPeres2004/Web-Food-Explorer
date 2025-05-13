import { Container, Main, Section } from "./style"

import { Header } from "../../components/Header/Index"
import { SideMenu } from "../../components/SideMenu"
import { CartItens } from "../../components/CartItens"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"

import Checkbox from '@mui/material/Checkbox'


import { FaPix } from "react-icons/fa6"
import { FiArrowLeft } from "react-icons/fi"
import { FaCreditCard } from "react-icons/fa"

import { useNavigate } from "react-router-dom"

import { useState, useEffect } from "react"

import { api } from "../../services/api"

import { useAuth } from "../../hooks/auth"

import { toast } from "react-toastify"
import Swal from 'sweetalert2'


export function Payment() {
    const navigate = useNavigate()
    const { user } = useAuth()


    const [numberCard, setNumberCard] = useState("")
    const [numberInstallments, setNumberInstallments] = useState(1)
    const [validity, setValidity] = useState("")
    const [cvc, setCvc] = useState("")
    const [deliveryType, setDeliveryType] = useState("delivery")
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [paymentByPix, setPaymentByPix] = useState(true)
    const [address, setAddress] = useState([])
    const [itemsInCart, setItemsInCart] = useState([])

    const [loading, setLoading] = useState(false)

    const total = itemsInCart.reduce((total, item) => total + item.price * item.quantity, 0)


    async function finalizeOrderWithPix() {
        setLoading(true)
        try {

            if (!address) {
                toast.error("Você não tem um endereço cadastrado")
                setLoading(false)
                return
            }

            if (itemsInCart.length === 0) {
                toast.error("Você não tem itens no carrinho")
                setLoading(false)
                return
            }

            const response = await api.post("/order", {
                deliveryType,
                paymentType: "pix",
                OrderItems: itemsInCart
            })

            Swal.fire({
                title: response.data.message,
                text: 'O pedido foi concluido com sucesso.',
                icon: 'success',
                theme: 'dark',
            }).then(() => {

                setTimeout(() => {
                    handleBack()
                    setLoading(false)
                    localStorage.removeItem("@food-explorer:ItemsCart")
                }, 1000)
            })
        } catch (error) {
            setLoading(false)

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }
    }

    async function finalizeOrderWithCreditCard() {
        setLoading(true)
        try {

            if (!address) {
                toast.error("Você não tem um endereço cadastrado")
                setLoading(false)
                return
            }

            if (itemsInCart.length === 0) {
                toast.error("Você não tem itens no carrinho")
                setLoading(false)
                return
            }

            if (!numberCard) {
                toast.error("Por favor insira o numero do cartão")
                setLoading(false)
                return
            }

            if (!validity) {
                toast.error("Por favor insira a validade do cartão")
                setLoading(false)
                return
            }

            if (!cvc) {
                toast.error("Por favor insira o codigo de segurança do cartão")
                setLoading(false)
                return
            }

            const response = await api.post("/order", {
                deliveryType,
                paymentType: "creditCard",
                numberInstallments,
                OrderItems: itemsInCart
            })

            Swal.fire({
                title: response.data.message,
                text: 'O pedido foi concluido com sucesso.',
                icon: 'success',
                theme: 'dark',
            }).then(() => {

                setTimeout(() => {
                    handleBack()
                    setLoading(false)
                    localStorage.removeItem("@food-explorer:ItemsCart")
                }, 1000)
            })
        } catch (error) {
            setLoading(false)
            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }
    }

    function handleDeleteItemCart(id) {
        const filteredDishInLocalStorage = itemsInCart.filter(item => item.id !== id) || []

        localStorage.setItem('@food-explorer:ItemsCart', JSON.stringify(filteredDishInLocalStorage))

        setItemsInCart(filteredDishInLocalStorage)

        window.dispatchEvent(new Event("cartChanged"))

    }


    function handleBack() {
        navigate(-1)
    }

    useEffect(() => {
        try {
            async function getAddress() {
                const response = await api.get("address", user)

                setAddress(response.data.userAddress)
            }

            function getItemsInCart() {
                const items = JSON.parse(localStorage.getItem('@food-explorer:ItemsCart')) || []
                setItemsInCart(items)
            }

            getItemsInCart()
            getAddress()

        } catch (error) {
            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }


    }, [])


    return (
        <Container>
            <SideMenu
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
            />

            <Header
                onOpenMenu={() => setMenuIsOpen(true)}
            />

            <Main>

                <ButtonText
                    onClick={handleBack}
                    icon={FiArrowLeft}
                    title="Voltar"
                    size={24}
                />

                <Section className="detailsUser">
                    <h1> Detalhes </h1>

                    <div className="details">
                        <span>{user.email}</span>
                        <span>{user.name}</span>
                        {
                            address ?
                                <>
                                    <span>{address ? address.city : ""}</span>
                                    <span>{address ? address.neighborhood : ""}</span>
                                    <span>{address ? `${address.street},  ${address.number}` : ""}</span>
                                    <span>{address ? `${address.complement}` : ""}</span>
                                </>

                                :

                                <span>
                                    Você não tem endereço cadastrado,
                                    {" "}

                                    <span id="linkToProfile" onClick={() => navigate('/profile')}>
                                        clique aqui
                                    </span>
                                    {" "}

                                    para cadastrar.

                                </span>
                        }
                    </div>

                </Section>

                <Section className="info-Orders">
                    <h1> Meu pedido </h1>

                    <div className="Orders">
                        {
                            itemsInCart &&
                            itemsInCart.map(dish => (
                                < CartItens
                                    key={String(dish.id)}
                                    data={dish}
                                    onClick={() => handleDeleteItemCart(dish.id)}
                                    title={`X ${dish.quantity}`}
                                    text="Remover do Carrinho"
                                />

                            ))
                        }
                    </div>

                </Section>

                <Section className="payment">
                    <h1> Pagamento </h1>

                    <div className="paymentOptions">

                        <div className="buttonFields">

                            <button
                                className={`pix ${paymentByPix ? "pixActive" : ""}`}
                                onClick={() => setPaymentByPix(true)}
                            >
                                <FaPix />
                                <span>Pix</span>
                            </button>

                            <button
                                className={`creditCard ${!paymentByPix ? "creditCardActive" : ""}`}
                                onClick={() => setPaymentByPix(false)}
                            >
                                <FaCreditCard />
                                <span>Cartão</span>
                            </button>

                        </div>


                        <div className="info-payment">

                            {
                                paymentByPix ?

                                    <div className="paymentPix">

                                        <div className="optionsDelivery">
                                            <label>
                                                <Checkbox
                                                    className="customCheckbox"
                                                    checked={deliveryType === "delivery"}
                                                    onChange={(e) => setDeliveryType("delivery")}
                                                    sx={{
                                                        color: "checkbox.primary.main",
                                                        '& .MuiSvgIcon-root': { fontSize: 24 },
                                                        '&.Mui-checked': {
                                                            color: "checkbox.primary.main",
                                                        }

                                                    }}
                                                />
                                                <span>Delivery</span>
                                            </label>

                                            <label>
                                                <Checkbox
                                                    className="customCheckbox"
                                                    checked={deliveryType === "withdrawal"}
                                                    onChange={(e) => setDeliveryType("withdrawal")}
                                                    sx={{
                                                        color: "checkbox.primary.main",
                                                        '& .MuiSvgIcon-root': { fontSize: 24 },
                                                        '&.Mui-checked': {
                                                            color: "checkbox.primary.main",
                                                        }

                                                    }}
                                                />
                                                <span>Retirada</span>
                                            </label>
                                        </div>


                                        <img src="/assets/qrcode.jpg" alt="QrCode" className="QrCode" />

                                        <div className="finishOrder">
                                            <h3>Total: R$ {total.toFixed(2).replace(".", ",")}</h3>
                                            <Button
                                                onClick={finalizeOrderWithPix}
                                                title="Finalizar o pedido"
                                                loading={loading}
                                            />
                                        </div>
                                    </div>


                                    :

                                    <form>


                                        <div className="optionsDelivery">
                                            <label>
                                                <Checkbox
                                                    className="customCheckbox"
                                                    checked={deliveryType === "delivery"}
                                                    onChange={(e) => setDeliveryType("delivery")}
                                                    sx={{
                                                        color: "checkbox.primary.main",
                                                        '& .MuiSvgIcon-root': { fontSize: 24 },
                                                        '&.Mui-checked': {
                                                            color: "checkbox.primary.main",
                                                        }

                                                    }}
                                                />
                                                <span>Delivery</span>
                                            </label>

                                            <label>
                                                <Checkbox
                                                    className="customCheckbox"
                                                    checked={deliveryType === "withdrawal"}
                                                    onChange={(e) => setDeliveryType("withdrawal")}
                                                    sx={{
                                                        color: "checkbox.primary.main",
                                                        '& .MuiSvgIcon-root': { fontSize: 24 },
                                                        '&.Mui-checked': {
                                                            color: "checkbox.primary.main",
                                                        }

                                                    }}
                                                />
                                                <span>Retirada</span>
                                            </label>
                                        </div>

                                        <label>
                                            <p>Número do Cartão</p>
                                            <input
                                                placeholder="0000 0000"
                                                maxLength={8}
                                                onChange={(e) => setNumberCard(e.target.value)}
                                            />
                                        </label>
                                        <div className="numberInstallments">
                                            <p>Número de parcelas</p>
                                            <select
                                                onChange={(e) => setNumberInstallments(e.target.value)}
                                            >
                                                <option value="1">1x</option>
                                                <option value="2">2x</option>
                                                <option value="3">3x</option>
                                                <option value="4">4x</option>
                                                <option value="5">5x</option>
                                                <option value="6">6x</option>
                                            </select>
                                        </div>


                                        <div className="info-creditCard">

                                            <label>
                                                <p>Validade</p>
                                                <input
                                                    maxLength={5}
                                                    placeholder="04/25"
                                                    onChange={(e) => setValidity(e.target.value)}
                                                />
                                            </label>

                                            <label>
                                                <p>CVC</p>
                                                <input
                                                    maxLength={3}
                                                    placeholder="000"
                                                    onChange={(e) => setCvc(e.target.value)}
                                                />
                                            </label>

                                        </div>


                                        <div className="finishOrder">
                                            <h3>
                                                Total: R$ {(total / numberInstallments).toFixed(2).replace(".", ",")}  {numberInstallments}x

                                            </h3>
                                            <Button
                                                onClick={finalizeOrderWithCreditCard}
                                                title="Finalizar o pedido"
                                                loading={loading}
                                            />
                                        </div>


                                    </form>

                            }

                        </div>




                    </div>

                </Section>

            </Main>



        </Container>
    )
}