import { Container, Main } from "./style"

import { Header } from "../../components/Header/Index"
import { SideMenu } from "../../components/SideMenu"
import { OrderBox } from "../../components/OrderBox"
import { ButtonText } from "../../components/ButtonText"

import { FiArrowLeft } from "react-icons/fi"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { USER_ROLES } from "../../utils/roles"

import { useAuth } from "../../hooks/auth"

import { api } from "../../services/api"

import { toast } from "react-toastify"

export function Orders() {
    const { user } = useAuth()

    const navigate = useNavigate()

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [orders, setOrders] = useState([])


    function handleBack() {
        navigate(-1)
    }


    async function updatedStatus(id, statusUpdated) {
        try {
            const response = await api.put(`/order/${id}`, {
                status: statusUpdated
            })

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === id ? { ...order, orderCompleted: statusUpdated } : order
                )
            )

            toast.success(response.data.message)
        } catch (error) {

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }
    }

    useEffect(() => {

        try {
            async function getOrders() {
                const response = await api.get('/order')
                setOrders(response.data)
            }

            getOrders()

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

                <h1 className="titleScreenLarge">Histórico de pedidos</h1>
                <h1 className="titleScreenNarrow">Pedidos</h1>

                <div id="orderBox">

                    {
                        orders.map(order => (
                            <OrderBox
                                key={String(order.id)}
                                data={order}
                                updatedStatus={updatedStatus}
                            />
                        ))

                    }
                </div>




                <table>
                    <thead>


                        <tr>
                            <th>Status</th>
                            <th>Código</th>
                            <th>Detalhamento</th>
                            <th>Data e hora</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.map(order => (
                                <tr
                                    key={String(order.id)}>
                                    {[USER_ROLES.ADMIN].includes(user.role) &&
                                        <td>
                                            <select
                                                value={order.orderCompleted}
                                                onChange={(e) => updatedStatus(order.id, e.target.value)}
                                            >
                                                <option value="pending">
                                                    Pendente
                                                </option>
                                                <option value="completed">Concluído</option>
                                                <option value="cancelled">Cancelado</option>
                                            </select>
                                        </td>
                                    }

                                    {[USER_ROLES.CUSTOMER].includes(user.role) &&
                                        <td className="orderStatus">
                                            <div>
                                                <span className={`${order.orderCompleted}`}></span>
                                                {order.orderCompleted === "pending" && "Pendente"}
                                                {order.orderCompleted === "cancelled" && "Cancelado"}
                                                {order.orderCompleted === "completed" && "Concluído"}
                                            </div>
                                        </td>
                                    }

                                    <td>{order.id}</td>

                                    <td>
                                        {
                                            order.itemsOrder.map((items, index) => (
                                                <span
                                                    key={String(items.id)}>
                                                    {items.count}x {items.dish_name}
                                                    {index < order.itemsOrder.length - 1 ? ', ' : ''}
                                                </span>
                                            ))
                                        }
                                    </td>

                                    <td>{order.created_at}</td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </Main>


        </Container >
    )
}