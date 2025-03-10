import { Container, Main } from "./style";

import { SideMenu } from '../../components/SideMenu'
import { Header } from "../../components/Header/Index";
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Input } from "../../components/Input";
import { InputFile } from "../../components/InputFile";
import { DishItem } from "../../components/DishItem";
import { TextArea } from '../../components/TextArea';
import { Button } from "../../components/Button";


import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { GiKnifeFork } from "react-icons/gi";
import { LiaMoneyBillAlt } from "react-icons/lia";


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewDish() {
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

                            <label>
                                <h2>Imagem do prato</h2>
                                <InputFile
                                    icon={FiUpload}
                                    title="Selecione imagem"
                                />
                            </label>

                            <label>
                                <h2>Nome do prato</h2>
                                <Input
                                    icon={GiKnifeFork}
                                    placeholder="Ex: Salada Ceasar"
                                />
                            </label>

                            <div>
                                <h2>Categoria</h2>

                                <select name="" id="">
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
                                />
                            </label>

                            <label className="Tags-field">
                                <h2>Ingredientes</h2>

                                <div className="tags">
                                    <DishItem
                                        placeholder="Adicionar"
                                        isNew={true}
                                    />
                                    <DishItem
                                        value="Pão Naan"
                                        isNew={false}
                                    />
                                    <DishItem
                                        value="Pão Naan"
                                        isNew={false}
                                    />
                                    <DishItem
                                        value="Pão Naan"
                                        isNew={false}
                                    />
                                    <DishItem
                                        value="Pão Naan"
                                        isNew={false}
                                    />
                                    <DishItem
                                        value="Pão Naan"
                                        isNew={false}
                                    />
                                    <DishItem
                                        value="Pão Naan"
                                        isNew={false}
                                    />
                                </div>

                            </label>

                        </div>


                        <label >
                            <h2>Descrição</h2>
                            <TextArea
                                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                            />
                        </label>

                        <Button
                            id="SaveChanges"
                            title="Salvar alterações"
                        />


                    </Section>

                </form>

            </Main>

        </Container >
    )
}