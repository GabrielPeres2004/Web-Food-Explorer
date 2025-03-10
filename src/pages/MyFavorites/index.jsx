import { Container } from "./style";

import { Header } from "../../components/Header/Index";
import { SideMenu } from "../../components/SideMenu";
import { CartItens } from '../../components/CartItens'
import { ButtonText } from "../../components/ButtonText";

import { FiArrowLeft } from "react-icons/fi";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function MyFavorites() {
    const navigate = useNavigate()
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    function handleBack() {
        navigate(-1)
    }

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
                    <CartItens />
                    <CartItens />
                    <CartItens />
                    <CartItens />
                    <CartItens />
                    <CartItens />
                    <CartItens />
                    <CartItens />
                    <CartItens />
                </section>


            </main>

        </Container >
    )
}