import { Container, ShoppingCart } from "./style";

import { FiList, FiShoppingCart, FiSearch, FiLogOut } from "react-icons/fi";
import { BiSolidDish } from "react-icons/bi";
import { FaHeart } from 'react-icons/fa';


import { Input } from '../Input'
import { Button } from '../Button'

import { USER_ROLES } from "../../utils/roles";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth"


export function Header({ onOpenMenu, closeHeader }) {
    const navigate = useNavigate()
    const { user, SignOut } = useAuth()

    function handleBack() {
        navigate(-1)
    }

    return (
        <Container >


            <Button
                onClick={onOpenMenu}
                id='openMenu'
                size={24}
                icon={FiList}
            />

            <div id="Logo">
                <img src="/assets/Polygon.svg" alt="Logo" id="polygon" />

                <p>
                    Food Explorer
                </p>
            </div>

            <div
                className="profile"
                onClick={() => navigate("/profile")}
            >
                <img src="/assets/Profile.jpg" alt="Imagem do usúario" />
            </div>


            <Input
                id="input"
                icon={FiSearch}
                placeholder="Busque por pratos ou ingredientes"
            />


            <Button
                id="orderHistory"
                title={user.role === USER_ROLES.CUSTOMER ? "Meus pedidos" : "Todos os pedidos"}
                icon={FiShoppingCart}
                size={18}
                onClick={() => navigate("/orderHistory")}
            />

            {[USER_ROLES.CUSTOMER].includes(user.role) &&
                <Button
                    id="myFavorites"
                    title="Meus Favoritos"
                    icon={FaHeart}
                    onClick={() => navigate("/favorite")}
                />


            }

            {[USER_ROLES.CUSTOMER].includes(user.role) &&
                <Button
                    id="CartItems"
                    size={18}
                    icon={FiShoppingCart}
                    title="Carrinho (0)"
                    onClick={() => navigate("/payment")}
                />
            }

            {[USER_ROLES.ADMIN].includes(user.role) &&
                <Button
                    id="newDish"
                    title="Novo Prato"
                    icon={BiSolidDish}
                    size={20}
                    onClick={() => navigate("/newDish")}
                />
            }

            <Button
                id="signOut"
                size={30}
                icon={FiLogOut}
                onClick={SignOut}
            />


            <ShoppingCart
                id="ShoppingCart"
                onClick={() => navigate("/payment")}
            >
                <FiShoppingCart />
                <div id="numberCart">
                    <p>0</p>
                </div>
            </ShoppingCart>

        </Container>
    )

}