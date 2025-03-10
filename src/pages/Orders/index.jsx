import { Container, Main } from "./style";

import { Header } from "../../components/Header/Index";
import { SideMenu } from "../../components/SideMenu";
import { OrderBox } from "../../components/OrderBox";
import { ButtonText } from "../../components/ButtonText";

import { FiArrowLeft } from "react-icons/fi";


import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { USER_ROLES } from "../../utils/roles";

export function Orders() {
    const navigate = useNavigate()
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [status, setStatus] = useState("completed");

    const user = {
        role: 'admin'
    }

    function handleBack() {
        navigate(-1)
    }

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

                <OrderBox />


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

                        <tr>
                            {[USER_ROLES.ADMIN].includes(user.role) &&
                                <td>
                                    <select>
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
                                        <span className={`${status}`}></span>
                                        {status === "pending" && "Pendente"}
                                        {status === "cancelled" && "Cancelado"}
                                        {status === "completed" && "Concluído"}
                                    </div>
                                </td>
                            }

                            <td>00004</td>

                            <td>
                                1x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                            </td>

                            <td>20/05 às 18h00</td>
                        </tr>

                    </tbody>

                </table>

            </Main>


        </Container >
    )
}