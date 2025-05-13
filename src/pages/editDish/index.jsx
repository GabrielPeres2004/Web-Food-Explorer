import { Container, Main } from "./style"

import { SideMenu } from '../../components/SideMenu'
import { Header } from "../../components/Header/Index"
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Input } from "../../components/Input"
import { InputFile } from "../../components/InputFile"
import { DishItem } from "../../components/DishItem"
import { TextArea } from '../../components/TextArea'
import { Button } from "../../components/Button"


import { FiArrowLeft, FiUpload } from "react-icons/fi"
import { GiKnifeFork } from "react-icons/gi"
import { LiaMoneyBillAlt } from "react-icons/lia"


import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { api } from "../../services/api"
import { useAuth } from "../../hooks/auth"

import { toast } from "react-toastify"
import Swal from 'sweetalert2'

export function EditDish() {
    const navigate = useNavigate()
    const params = useParams()

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const { SignOut } = useAuth()

    const [dishFile, setDishFile] = useState(null)

    const [dish, setDish] = useState({})

    const [nameDish, setNameDish] = useState("")
    const [category, setCategory] = useState("Refeição")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [newIngredients, setNewIngredients] = useState("")
    const [ingredients, setIngredients] = useState([])

    const [loading, setLoading] = useState(false)


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

    async function handleUpdateDish() {
        try {
            setLoading(true)

            if (newIngredients) {
                toast.error("Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique para adicionar.")
                setloading(false)
            }


            if (dishFile) {
                const fileUploadForm = new FormData()

                fileUploadForm.append("imageDish", dishFile)

                await api.patch(`/dish/imageDish/${params.id}`, fileUploadForm)
            }

            const response = await api.put(`dish/${params.id}`, {
                name: nameDish,
                description,
                category,
                price,
                ingredients
            })

            Swal.fire({
                title: response.data.message,
                icon: "success",
                draggable: true,
                theme: 'dark',
            }).then(() => {
                setLoading(false)
                setTimeout(() => { navigate("/") }, 1000)
            })

            setLoading(false)
        } catch (error) {
            setLoading(false)
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

    async function handleDeleteDish() {
        try {
            setLoading(true)


            const deleteItem = async () => {
                try {
                    const response = await api.delete(`dish/${params.id}`)

                    return { message: response.data.message, success: true }

                } catch (error) {

                    if (error.response?.status === 401) {
                        SignOut()
                    }

                    if (error.response) {
                        toast.error(error.response.data.message)
                    }

                    return { success: false }

                }

            }


            Swal.fire({
                title: 'Você tem certeza de que deseja deletar? Todos os pedidos vinculados a este prato serão deletados juntos.',
                text: "Essa ação não pode ser desfeita!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Cancelar',
                theme: 'dark',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { message, success } = await deleteItem()

                    if (!success) {
                        setLoading(false)
                        return
                    }

                    Swal.fire({
                        title: message,
                        text: 'O item foi deletado com sucesso.',
                        icon: 'success',
                        theme: 'dark',
                    }).then(() => {
                        setLoading(false)
                        setTimeout(() => { navigate("/") }, 1000)
                    })


                } else {
                    setLoading(false)
                    Swal.fire({
                        title: 'Cancelado',
                        text: 'A exclusão foi cancelada.',
                        icon: 'info',
                        theme: 'dark',
                    })
                }
            })
        } catch (error) {
            setLoading(false)

            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    async function handleDisactiveAndActiveDish() {

        let response

        try {
            if (dish.active === 1) {
                response = await api.patch(`dish/disable/${params.id}`)
            } else {
                response = await api.patch(`dish/active/${params.id}`)
            }


            Swal.fire({
                title: response.data.message,
                icon: "success",
                draggable: true,
                theme: 'dark',
            }).then(() => {
                setLoading(false)
                setTimeout(() => { navigate("/") }, 1000)
            })

        } catch (error) {
            if (error.response?.status === 401) {
                SignOut()
            }

            if (error.response) {
                toast.error(error.response.data.message)
            }

        }



    }


    useEffect(() => {

        try {
            async function getDish() {
                const response = await api.get(`dish/${params.id}`)
                setDish(response.data)
            }


            getDish()

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

        setNameDish(dish.name)
        setCategory(dish.category)
        setPrice(dish.price)
        setDescription(dish.description)

        if (dish.ingredients) {
            const extractedIngredients = dish.ingredients.map(ingredient => ingredient.name)
            setIngredients(extractedIngredients)
        }


    }, [dish])

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
                        size={24}
                        icon={FiArrowLeft}
                        title="Voltar"
                        onClick={handleBack}
                    />

                    <h1>Editar Prato</h1>

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
                                    value={nameDish}
                                />
                            </label>

                            <div id="category">
                                <h2>Categoria</h2>

                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                >
                                    <option value="Refeição">Refeição</option>
                                    <option value="Sobremesa">Sobremesa</option>
                                    <option value="Bebidas">Bebidas</option>
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
                                    value={price}
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
                                value={description}
                            />
                        </label>

                        <section className="saveAndDeleteButton">
                            <Button
                                id="SaveChanges"
                                title={dish.active === 1 ? "Desativar prato" : "Ativar Prato"}
                                loading={loading}
                                onClick={handleDisactiveAndActiveDish}
                            />

                            <Button
                                id="DeleteButton"
                                title="Excluir prato"
                                onClick={handleDeleteDish}
                                loading={loading}
                            />


                            <Button
                                id="SaveChanges"
                                title="Salvar alterações"
                                onClick={handleUpdateDish}
                                loading={loading}
                            />

                        </section>


                    </Section>

                </form>

            </Main>

        </Container >
    )
}
