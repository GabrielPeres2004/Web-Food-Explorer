import { Container } from "./style";
import { USER_ROLES } from "../../utils/roles";

import { useState } from "react";

import { useAuth } from "../../hooks/auth";

export function OrderBox({ data, updatedStatus }) {

    const { user } = useAuth()

    return (
        <Container className="OrderBox">
            <header>
                <span className="idOrder">{data.id}</span>
                {[USER_ROLES.CUSTOMER].includes(user.role) &&

                    <div className="statusOrder">
                        <span className={`statusCircle status-${data.orderCompleted}`}></span>
                        <span>
                            {data.orderCompleted === "pending" && "Pendente"}
                            {data.orderCompleted === "cancelled" && "Cancelado"}
                            {data.orderCompleted === "completed" && "Concluído"}
                        </span>
                    </div>
                }


                {
                    [USER_ROLES.ADMIN].includes(user.role) &&

                    <select
                        value={data.orderCompleted}
                        onChange={(e) => updatedStatus(data.id, e.target.value)}
                    >
                        <option value="pending" >
                            Pendente
                        </option>
                        <option value="completed">Concluido</option>
                        <option value="cancelled">Cancelado</option>
                    </select>
                }
                <span>{data.created_at}</span>
            </header>

            <main>
                <div className="descriptionOrder">
                    {
                        data.itemsOrder.map(items => (
                            <span
                                key={String(items.id)}>
                                {items.count} x {items.dish_name}
                            </span>
                        ))
                    }

                </div>

            </main>

        </Container >
    )
}