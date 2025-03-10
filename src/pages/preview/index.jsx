import { Container, Main, Content } from "./style";

import { Header } from "../../components/Header/Index";
import { SideMenu } from "../../components/SideMenu";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Tag } from '../../components/Tags'

import { useState } from "react";

import { FiArrowLeft, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { USER_ROLES } from "../../utils/roles";

export function Preview() {
    const navigate = useNavigate()
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const count = '45'

    const user = {
        role: 'admin'
    }

    function handleBack() {
        navigate(-1)
    }


    return (
        <Container>
            <Header
                onOpenMenu={() => setMenuIsOpen(true)}
                closeHeader={menuIsOpen}
            />

            <SideMenu
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
            />

            <Main>


                <ButtonText
                    onClick={handleBack}
                    icon={FiArrowLeft}
                    title="Voltar"
                    size={24}
                />

                <Content>


                    <img src="../../assets/molla.svg" alt="" />

                    <div className="informations">

                        <p className="nameDish">Salada Ravanello</p>
                        <p className="description">Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.</p>

                    </div>


                    <div className="Tags">
                        <Tag
                            title="alface"
                        />
                        <Tag
                            title="alface"
                        />
                        <Tag
                            title="alface"
                        />
                        <Tag
                            title="alface"
                        />
                        <Tag
                            title="alface"
                        />
                        <Tag
                            title="alface"
                        />

                    </div>


                    <div className="addToCart">
                        {[USER_ROLES.CUSTOMER].includes(user.role) &&
                            <div className="addAndSubtract">
                                <ButtonText
                                    icon={FiMinus}
                                    size={28}
                                />

                                <ButtonText
                                    title='01'
                                />

                                <ButtonText
                                    size={28}
                                    icon={FiPlus}
                                />
                            </div>
                        }


                        <Button
                            className="buttonCart"
                            title={user.role === USER_ROLES.CUSTOMER ? "Incluir" : "Editar Prato"}
                            count={user.role === USER_ROLES.CUSTOMER ? `R$ ${count}` : ""}
                            icon={user.role === USER_ROLES.CUSTOMER ? FiShoppingCart : FaPencilAlt}
                        />
                    </div>



                </Content>

            </Main>




        </Container>
    )

}