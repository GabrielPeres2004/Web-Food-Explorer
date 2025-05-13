import { Container, Main } from "./style"

import { ButtonText } from '../../components/ButtonText'
import { InputFile } from "../../components/InputFile"
import { TextArea } from '../../components/TextArea'
import { SideMenu } from '../../components/SideMenu'
import { DishItem } from "../../components/DishItem"
import { Section } from '../../components/Section'
import { Button } from "../../components/Button"
import { Header } from "../../components/Header/Index"
import { Input } from "../../components/Input"


import { FiArrowLeft, FiUpload } from "react-icons/fi"
import { GiKnifeFork } from "react-icons/gi"
import { LiaMoneyBillAlt } from "react-icons/lia"


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"
import { useAuth } from "../../hooks/auth"

import { toast } from "react-toastify"
import Swal from 'sweetalert2'


export function NewDish() {
    const { SignOut } = useAuth()
    const navigate = useNavigate()
    const [menuIsOpen, setMenuIsOpen] = useState(false)



    const [dishFile, setDishFile] = useState(null)

    const [nameDish, setNameDish] = useState("")
    const [category, setCategory] = useState("Refeição")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [newIngredients, setNewIngredients] = useState("")
    const [ingredients, setIngredients] = useState([])

    const [loading, setloading] = useState(false)


    function handleBack() {
        navigate(-1)
    }

    function handleAddIngredients() {

        if (newIngredients === "") {
            return
        }

        setIngredients((prevState) => [...prevState, newIngredients])
        setNewIngredients("")

    }


    function handleDeleteIngredients(ingredientDeleted) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== ingredientDeleted))
    }


    async function handleCreateDish() {
        try {
            setloading(true)

            if (!dishFile) {
                setloading(false)
                toast.error("Por favor, insira uma imagem do prato.")
                return
            }

            if (newIngredients) {
                setloading(false)
                toast.error("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar.")
                return
            }

            const response = await api.post("dish", {
                name: nameDish,
                description,
                category,
                price,
                ingredients
            })

            const dishId = response.data.dish_id


            const fileUploadForm = new FormData()

            fileUploadForm.append("imageDish", dishFile)
            fileUploadForm.append("dishId", dishId)

            await api.post("/dish/imageDish", fileUploadForm)


            Swal.fire({
                title: response.data.message,
                icon: "success",
                draggable: true,
                theme: 'dark',
            }).then(() => {
                setTimeout(() => { navigate("/") }, 1000)
            })

            setloading(false)
        } catch (error) {
            setloading(false)
            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }
    }

    function handleAddImageDish(event) {
        const file = event.target.files[0]
        setDishFile(file)
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
                <form>


                    <ButtonText
                        onClick={handleBack}
                        icon={FiArrowLeft}
                        title="Voltar"
                        size={24}
                    />

                    <h1>Novo Prato</h1>

                    <Section>

                        <div className="information-dish">

                            <label id="imageFile">
                                <article>
                                    <h2>Imagem do prato</h2>
                                    <p>{dishFile ? dishFile.name : " "}</p>
                                </article>

                                <InputFile
                                    icon={FiUpload}
                                    title="Selecione imagem"
                                    onChange={handleAddImageDish}
                                />
                            </label>

                            <label>
                                <h2>Nome do prato</h2>
                                <Input
                                    icon={GiKnifeFork}
                                    placeholder="Ex: Salada Ceasar"
                                    onChange={(e) => setNameDish(e.target.value)}
                                />
                            </label>

                            <div id="category">
                                <h2>Categoria</h2>

                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option
                                        value="Refeição">
                                        Refeição
                                    </option>

                                    <option
                                        value="Sobremesa">
                                        Sobremesa
                                    </option>

                                    <option
                                        value="Bebidas">
                                        Bebidas
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className="categoryAndPrice">

                            <label className="dolar">
                                <h2>Preço</h2>
                                <Input
                                    icon={LiaMoneyBillAlt}
                                    placeholder="R$ 00,00"
                                    size={30}
                                    type="number"
                                    step="0.1"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>

                            <label className="Tags-field">
                                <h2>Ingredientes</h2>

                                <div className="tags">
                                    <DishItem
                                        placeholder="Adicionar"
                                        isNew
                                        value={newIngredients}
                                        onChange={(e) => setNewIngredients(e.target.value)}
                                        onClick={handleAddIngredients}
                                    />

                                    {
                                        ingredients && ingredients.map((ingredient, index) => (

                                            < DishItem
                                                key={String(index)}
                                                value={ingredient}
                                                onClick={() => handleDeleteIngredients(ingredient)}
                                            />
                                        ))
                                    }

                                </div>

                            </label>

                        </div>

                        <label >
                            <h2>Descrição</h2>
                            <TextArea
                                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>

                        <Button
                            id="SaveChanges"
                            title="Salvar alterações"
                            onClick={handleCreateDish}
                            loading={loading}
                        />


                    </Section>

                </form>

            </Main>

        </Container >
    )
}

