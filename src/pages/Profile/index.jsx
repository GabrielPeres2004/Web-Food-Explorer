import { Container, Main } from "./style";

import { SideMenu } from "../../components/SideMenu";
import { Header } from "../../components/Header/Index";
import { ButtonText } from "../../components/ButtonText";
import { TextArea } from "../../components/TextArea"
import { InputFile } from '../../components/InputFile'
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { FiArrowLeft, FiUpload, FiUser, FiMail, FiLock } from "react-icons/fi";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";

import avatarPlaceholder from '/assets/avatar_placeholder.svg'

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";
import { toast } from "react-toastify";

export function Profile() {
    const { user, updatedProfile } = useAuth()

    const navigate = useNavigate()

    const imageUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [address, setAddress] = useState({})

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState()
    const [newPassword, setNewPassword] = useState()

    const [avatar, setAvatar] = useState(imageUrl)
    const [avatarFile, setAvatarFile] = useState(null)



    const [cep, setCep] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [numberHouse, setNumberHouse] = useState("")
    const [complement, setComplement] = useState("")


    const [loading, setLoading] = useState(false)


    function handleBack() {
        navigate(-1)
    }

    async function createAddress() {
        try {
            const addressPayload = {
                cep,
                city,
                neighborhood,
                street,
                number: numberHouse,
                complement
            }

            const addressResponse = await api.post("address", addressPayload)

            setAddress(addressResponse.data.address)

            return true

        } catch (error) {

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Não foi possivel criar o endereço.")
            }
            return false

        }
    }

    async function updatedAddress() {
        try {
            const addressPayload = {
                cep,
                city,
                neighborhood,
                street,
                number: numberHouse,
                complement,
            }

            const addressResponse = await api.put("address", addressPayload)

            setAddress(addressResponse.data.address)

            return true

        } catch (error) {

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Não foi possivel atualizar o endereço.")
            }

            return false

        }
    }


    async function handleUpdateProfile() {
        try {
            setLoading(true)

            if (user.role === 'customer') {

                if (!address) {
                    const handleCreateAddress = await createAddress();

                    if (!handleCreateAddress) {
                        setLoading(false)
                        return
                    }

                }
                else {
                    const handleUpdateAddress = await updatedAddress()

                    if (!handleUpdateAddress) {
                        setLoading(false)
                        return
                    }
                }

            }

            const updated = {
                name,
                email,
                password: newPassword,
                oldPassword: passwordOld
            };

            const userUpdated = Object.assign(user, updated);

            await updatedProfile({ user: userUpdated, avatarFile });

            setLoading(false)

        } catch (error) {

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }

    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0]

        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)


        setAvatar(imagePreview)
    }

    useEffect(() => {
        try {
            async function getAddress() {
                const response = await api.get("address", user)

                setAddress(response.data.userAddress)
            }

            getAddress()

        } catch (error) {
            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }
        }


    }, [])

    useEffect(() => {

        setCep(address?.cep || "")
        setCity(address?.city || "")
        setStreet(address?.street || "")
        setNeighborhood(address?.neighborhood || "")
        setNumberHouse(address?.number || "")
        setComplement(address?.complement || "")


    }, [address])



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
                        <img
                            src={avatar}
                            alt="ImageUser"
                        />
                    </div>

                    <section className="fieldInput">
                        <h2>Informações pessoais</h2>

                        <label>
                            <p>Imagem de usuário</p>
                            <InputFile
                                icon={FiUpload}
                                title="Selecione imagem"
                                onChange={handleChangeAvatar}
                            />
                        </label>

                        <label>
                            <p>Nome do usuário</p>
                            <Input
                                icon={FiUser}
                                placeholder="Digite seu nome"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </label>

                        <label>
                            <p>Seu email</p>
                            <Input
                                icon={FiMail}
                                placeholder="Digite seu email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}

                            />
                        </label>

                        <label>
                            <p>Sua senha</p>
                            <Input
                                icon={FiLock}
                                placeholder="Digite sua senha"
                                onChange={(e) => setPasswordOld(e.target.value)}
                                type="password"
                            />
                        </label>

                        <label>
                            <p>Sua senha nova</p>
                            <Input
                                icon={FiLock}
                                placeholder="Digite sua senha nova"
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                            />
                        </label>


                        {
                            user.role === 'customer' && (

                                <>

                                    <h2>Seu endereço</h2>


                                    <label>
                                        <p>Seu cep</p>
                                        <Input
                                            icon={FaMapMarkerAlt}
                                            placeholder="Exemplo: 04001-000"
                                            onChange={(e) => {
                                                setCep(e.target.value)
                                                setNeighborhood("")
                                                setStreet("")
                                                setNumberHouse("")
                                                setComplement("")
                                            }}
                                            value={cep}

                                        />
                                    </label>


                                    <label>
                                        <p>Sua cidade</p>
                                        <Input
                                            icon={FaCity}
                                            placeholder="Exemplo: São paulo"
                                            onChange={(e) => setCity(e.target.value)}
                                            value={city}
                                        />
                                    </label>

                                    <label>
                                        <p>Seu bairro</p>
                                        <Input
                                            placeholder="Exemplo: Paraíso"
                                            onChange={(e) => setNeighborhood(e.target.value)}
                                            value={neighborhood}
                                        />
                                    </label>

                                    <label>
                                        <p>Sua rua</p>
                                        <Input
                                            placeholder="Exemplo: Rua Manuel da Nóbrega"
                                            size={24}
                                            onChange={(e) => setStreet(e.target.value)}
                                            value={street}
                                        />
                                    </label>

                                    <label>
                                        <p>Seu número</p>
                                        <Input
                                            placeholder="Exemplo: 10"
                                            onChange={(e) => setNumberHouse(e.target.value)}
                                            value={numberHouse}
                                        />
                                    </label>


                                    <label>
                                        <p>Complemento</p>
                                        <TextArea
                                            placeholder="Digite o complemento:"
                                            onChange={(e) => setComplement(e.target.value)}
                                            value={complement}
                                        />
                                    </label>

                                </>
                            )
                        }

                        <Button
                            title="Salvar alterações"
                            onClick={handleUpdateProfile}
                            loading={loading}
                        />

                    </section>

                </form>

            </Main>

        </Container >
    )
}