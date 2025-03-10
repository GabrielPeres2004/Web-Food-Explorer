import { Container, Header, Main } from "./style";

import { FiX, FiSearch, FiLogOut, FiUser } from "react-icons/fi";
import { BiSolidDish } from "react-icons/bi";
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

import { Input } from '../Input'
import { Button } from '../Button'

import { USER_ROLES } from "../../utils/roles";

import { useNavigate } from "react-router-dom";


export function SideMenu({ menuIsOpen, onCloseMenu }) {
    const navigate = useNavigate()
    const user = {
        role: "admin"
    }


    return (
        <Container data-menu-is-open={menuIsOpen}>
            <Header>
                <Button
                    onClick={onCloseMenu}
                    id='closeMenu'
                    size={20}
                    icon={FiX}
                />
                <h1>Menu</h1>
            </Header>

            <Main>

                <Input
                    id='input'
                    icon={FiSearch}
                    placeholder='Busque por pratos ou ingredientes'
                />

                <Button
                    id='button'
                    icon={FiLogOut}
                    title='Sair'
                />

                <Button
                    id='button'
                    icon={FiUser}
                    title='Meu perfil'
                    onClick={() => navigate("/profile")}
                />

                {[USER_ROLES.CUSTOMER].includes(user.role) &&
                    <Button
                        id='button'
                        icon={FaShoppingCart}
                        title='Carrinho'
                        onClick={() => navigate("/payment")}
                    />
                }

                <Button
                    id='button'
                    icon={FaShoppingCart}
                    title={user.role === USER_ROLES.CUSTOMER ? "Meus pedidos" : "Todos os pedidos"}
                    onClick={() => navigate("/orderHistory")}
                />


                {[USER_ROLES.CUSTOMER].includes(user.role) &&
                    <Button
                        id='button'
                        icon={FaHeart}
                        title='Meus favoritos'
                        onClick={() => navigate("/favorite")}
                    />
                }



                {[USER_ROLES.ADMIN].includes(user.role) &&
                    <Button
                        id='button'
                        icon={BiSolidDish}
                        title='Novo Prato'
                        onClick={() => navigate("/newDish")}
                    />
                }

            </Main>

        </Container>
    )
}