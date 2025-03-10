import { Container, Main, Section } from "./style";

import { Header } from "../../components/Header/Index";
import { SideMenu } from "../../components/SideMenu";
import { CartItens } from "../../components/CartItens";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";


import { FaPix } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

export function Payment() {
    const navigate = useNavigate()
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [paymentByPix, setPaymentByPix] = useState(true)

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

                <Section className="detailsUser">
                    <h1> Detalhes </h1>

                    <div className="details">
                        <span>gabriel@email.com</span>
                        <span>Gabriel Peres</span>
                        <span>Vila Comercial</span>
                        <span>Rua josué de toledo, 10</span>
                    </div>

                </Section>

                <Section className="info-Orders">
                    <h1> Meu pedido </h1>

                    <div className="Orders">
                        <CartItens />
                        <CartItens />
                        <CartItens />
                        <CartItens />
                        <CartItens />
                    </div>

                </Section>

                <Section className="payment">
                    <h1> Pagamento </h1>

                    <div className="paymentOptions">

                        <div className="buttonFields">

                            <button
                                className={`pix ${paymentByPix ? "pixActive" : ""}`}
                                onClick={() => setPaymentByPix(true)}
                            >
                                <FaPix />
                                <span>Pix</span>
                            </button>

                            <button
                                className={`creditCard ${!paymentByPix ? "creditCardActive" : ""}`}
                                onClick={() => setPaymentByPix(false)}
                            >
                                <FaCreditCard />
                                <span>Crédito</span>
                            </button>

                        </div>


                        <div className="info-payment">

                            {
                                paymentByPix ?

                                    <div className="paymentPix">
                                        <img src="/assets/qrcode.jpg" alt="QrCode" className="QrCode" />

                                        <div className="finishOrder">
                                            <h3>Total: R$ 103,88</h3>
                                            <Button
                                                title="Finalizar o pedido"
                                            />
                                        </div>
                                    </div>


                                    :

                                    <form>

                                        <label>
                                            <p>Número do Cartão</p>
                                            <input
                                                placeholder="0000 0000 0000"
                                            />
                                        </label>

                                        <div className="numberInstallments">
                                            <p>Número de parcelas</p>
                                            <select>
                                                <option value="1">1x</option>
                                                <option value="2">2x</option>
                                                <option value="3">3x</option>
                                                <option value="4">4x</option>
                                                <option value="5">5x</option>
                                                <option value="6">6x</option>
                                            </select>
                                        </div>


                                        <div className="info-creditCard">

                                            <label>
                                                <p>Validade</p>
                                                <input
                                                    placeholder="04/25"
                                                />
                                            </label>

                                            <label>
                                                <p>CVC</p>
                                                <input
                                                    placeholder="000"
                                                />
                                            </label>

                                        </div>


                                        <div className="finishOrder">
                                            <h3>Total: R$ 103,88</h3>
                                            <Button
                                                title="Finalizar o pedido"
                                            />
                                        </div>


                                    </form>

                            }

                        </div>




                    </div>

                </Section>

            </Main>



        </Container>
    )
}