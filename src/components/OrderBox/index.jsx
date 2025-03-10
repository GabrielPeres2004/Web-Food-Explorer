import { Container } from "./style";
import { USER_ROLES } from "../../utils/roles";

import { useState } from "react";

export function OrderBox() {
    const [status, setStatus] = useState("pending");

    const user = {
        role: 'admin'
    }

    return (
        <Container className="OrderBox">
            <header>
                <span className="idOrder">000004</span>
                {[USER_ROLES.CUSTOMER].includes(user.role) &&

                    <div className="statusOrder">
                        <span className={`statusCircle status-${status}`}></span>
                        <span>
                            {status === "pending" && "Pendente"}
                            {status === "cancelled" && "Cancelado"}
                            {status === "completed" && "Concluído"}
                        </span>
                    </div>
                }

                {[USER_ROLES.ADMIN].includes(user.role) &&
                    <select>
                        <option value="pending" >
                            Pendente
                        </option>
                        <option value="completed">Concluido</option>
                        <option value="cancelled">Cancelado</option>
                    </select>
                }
                <span>2024-12-07 17:10:21</span>
            </header>

            <main>
                <div className="descriptionOrder">
                    <span>1 x Salada Radish</span>
                    <span>1 x Salada Radish</span>
                    <span>1 x Salada Radish</span>
                    <span>1 x Salada Radish</span>
                    <span>1 x Salada Radish</span>
                </div>

            </main>

        </Container >
    )
}