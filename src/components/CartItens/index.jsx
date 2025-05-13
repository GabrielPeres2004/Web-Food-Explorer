import { Container } from "./style"

import { api } from "../../services/api"

import { useState } from "react"

export function CartItens({ data, onClick, title, text }) {


    const imageUrl = `${api.defaults.baseURL}/files_image_dish/${data.imageDish}`


    return (
        <Container>
            <img src={imageUrl} alt="Foto do prato" />

            <div className="itemInformation">

                <div className="item-description">
                    <h4>{data.name}</h4>
                    <div>
                        <span className="quantity">{title}</span>
                        <span className="price">${data.price}</span>
                    </div>
                </div>

                <span
                    onClick={onClick}
                    className="removeItem">
                    {text}

                </span>

            </div>

        </Container>
    )
}