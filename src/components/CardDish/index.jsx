import { Container } from "./style";

import { FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';

import { ButtonText } from '../ButtonText'
import { Button } from '../Button'

import 'animate.css';

import { USER_ROLES } from "../../utils/roles";

import { FaPencilAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export function CardDish({ favorite, addTofavorites, data }) {
    const navigate = useNavigate()
    const user = {
        role: "admin"
    }

    return (
        <Container data-is-favorite={favorite}>

            <div id="favorite">

                {[USER_ROLES.CUSTOMER].includes(user.role) &&
                    <FaHeart
                        id="addTofavorites"
                        onClick={addTofavorites}
                    />
                }

                {[USER_ROLES.ADMIN].includes(user.role) &&
                    <FaPencilAlt
                        id="addTofavorites"
                        onClick={() => navigate("/editDish")}
                    />
                }

            </div>

            <img src='../../assets/molla.svg' alt="Imagem do prato" id="DishImage" />

            <p id="nameDish">Salada</p>

            <span>R$ 49,97</span>

            {[USER_ROLES.CUSTOMER].includes(user.role) &&
                <div id="addToCart">
                    <ButtonText
                        icon={FiMinus}
                        size={20}
                    />

                    <ButtonText
                        title='01'
                    />

                    <ButtonText
                        size={20}
                        icon={FiPlus}
                    />
                </div>
            }


            {[USER_ROLES.CUSTOMER].includes(user.role) &&
                <Button
                    id='buttonInclude'
                    title='Incluir'
                />
            }






        </Container>
    )
}