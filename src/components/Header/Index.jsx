import { Container, ShoppingCart } from "./style";

import { FiList, FiShoppingCart, FiSearch, FiLogOut } from "react-icons/fi";
import { BiSolidDish } from "react-icons/bi";
import { FaHeart } from 'react-icons/fa';

import avatarPlaceholder from '/assets/avatar_placeholder.svg'

import { Input } from '../Input'
import { Button } from '../Button'

import { USER_ROLES } from "../../utils/roles";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth"

import { api } from "../../services/api";

import { useState, useEffect } from "react";

export function Header({ onOpenMenu, onChange }) {
    const navigate = useNavigate()
    const { user, SignOut } = useAuth()

    const imageURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

    const [itemsCount, setItemsCount] = useState(0)

    useEffect(() => {
        function updateCartCount() {
            const items = JSON.parse(localStorage.getItem('@food-explorer:ItemsCart')) || []
            setItemsCount(items.length)
        }

        updateCartCount()
        window.addEventListener("cartChanged", updateCartCount)

        return () => window.removeEventListener("cartChanged", updateCartCount)
    }, [])


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
                <img src={imageURL} alt="Imagem do usúario" />
            </div>


            <Input
                id="input"
                icon={FiSearch}
                placeholder="Busque por pratos"
                onChange={onChange}
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
                    title={`Carrinho (${itemsCount})`}
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
                    <p>{itemsCount}</p>
                </div>
            </ShoppingCart>

        </Container>
    )

}