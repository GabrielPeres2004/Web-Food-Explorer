import { Container, Form } from "./style"

import { Logo } from "../../components/Logo"
import { Section } from "../../components/Section"
import { Input } from "../../components/Input"
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'

import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"



export function SignUp() {
    const navigate = useNavigate()
    const { SignUp } = useAuth()


    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function handleSignUp() {
        setLoading(true)

        SignUp({ name, email, password })
            .then(sucess => {
                setLoading(false)

                setTimeout(() => {
                    if (sucess) {
                        navigate(-1)
                    }
                }, 6000);

            })

    }

    function handleBack() {
        navigate(-1)
    }


    return (
        <Container>

            <Logo />
            <Form>
                <h1>
                    Crie sua conta
                </h1>


                <Section>

                    <div>
                        <h2>Seu nome</h2>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Exemplo: Maria da Silva"
                        />
                    </div>

                    <div>
                        <h2>Email</h2>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="exemplo@exemplo.com.br"
                        />
                    </div>

                    <div>
                        <h2>Senha</h2>
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="No mínimo 6 caracteres"
                        />
                    </div>

                    <Button
                        title="Entrar"
                        loading={loading}
                        onClick={handleSignUp}

                    >
                    </Button>


                </Section>


                <ButtonText
                    onClick={handleBack}
                    title="Faça login"
                />

            </Form>
        </Container>
    )
}