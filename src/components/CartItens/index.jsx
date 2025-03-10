import { Container } from "./style"

export function CartItens() {
    return (
        <Container>
            <img src="../../assets/molla.svg" alt="" />

            <div className="itemInformation">

                <div className="item-description">
                    <h1>Salada Radish</h1>
                    <span className="price">$25,97</span>
                </div>

                <span className="removeItem">Remover do Carrinho</span>

            </div>

        </Container>
    )
}