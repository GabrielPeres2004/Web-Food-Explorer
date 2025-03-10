import { Container, Main } from "./style";

import { SideMenu } from "../../components/SideMenu";
import { Header } from "../../components/Header/Index";
import { ButtonText } from "../../components/ButtonText";
import { InputFile } from '../../components/InputFile'
import { Input } from "../../components/Input";

import { FiArrowLeft, FiUpload, FiUser, FiMail, FiLock } from "react-icons/fi";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";



import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate()
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    function handleBack() {
        navigate(-1)
    }

    return (
        <Container>
            <SideMenu
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
            />

            <Header
                onOpenMenu={() => setMenuIsOpen(true)}
            />

            <Main>
                <ButtonText
                    onClick={handleBack}
                    icon={FiArrowLeft}
                    title="Voltar"
                    size={24}
                />

                <form>
                    <div className="UserImage">
                        <img src="/assets/Profile.jpg" alt="ImageUser" />
                    </div>

                    <section className="fieldInput">
                        <h2>Informações pessoais</h2>

                        <label>
                            <p>Imagem de usuário</p>
                            <InputFile
                                icon={FiUpload}
                                title="Selecione imagem"
                            />
                        </label>

                        <label>
                            <p>Nome do usuário</p>
                            <Input
                                icon={FiUser}
                                placeholder="Digite seu nome"
                            />
                        </label>

                        <label>
                            <p>Seu email</p>
                            <Input
                                icon={FiMail}
                                placeholder="Digite seu email"
                            />
                        </label>

                        <label>
                            <p>Sua senha</p>
                            <Input
                                icon={FiLock}
                                placeholder="Digite sua senha"
                            />
                        </label>

                        <h2>Seu endereço</h2>

                        <label>
                            <p>Seu cep</p>
                            <Input
                                icon={FaMapMarkerAlt}
                                placeholder="04001-000"
                            />
                        </label>

                        <label>
                            <p>Sua cidade</p>
                            <Input
                                icon={FaCity}
                                placeholder="São paulo"
                            />
                        </label>

                        <label>
                            <p>Seu bairro</p>
                            <Input
                                placeholder="Exemplo: Paraíso"
                            />
                        </label>

                        <label>
                            <p>Sua rua</p>
                            <Input
                                placeholder="Exemplo: Rua Manuel da Nóbrega"
                                size={24}
                            />
                        </label>

                        <label>
                            <p>Seu número</p>
                            <Input
                                placeholder="Exemplo: 10"
                            />
                        </label>

                    </section>

                </form>

            </Main>

        </Container>
    )
}