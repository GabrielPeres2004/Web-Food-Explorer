import { Container, Form } from "./style"

import { Logo } from "../../components/Logo"
import { Section } from "../../components/Section"
import { Input } from "../../components/Input"
import { Button } from '../../components/Button'

import { useAuth } from "../../hooks/auth"
import { useState } from "react"

import { Link } from "react-router-dom"


export function SignIn() {
    const { SignIn } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)



    async function handleSignIn() {
        setLoading(true)
        SignIn({ email, password })
        setLoading(false)
    }

    return (
        <Container>
            <Logo />
            <Form>
                <h1>
                    Faça login
                </h1>

                <Section>

                    <div>
                        <h2>Email</h2>
                        <Input
                            placeholder="exemplo@exemplo.com.br"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2>Senha</h2>
                        <Input
                            placeholder="No mínimo 6 caracteres"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>

                    <Button
                        title="Entrar"
                        loading={loading}
                        onClick={handleSignIn}
                    />


                </Section>


                <div id="link">
                    <Link to="/register">Criar uma conta</Link>
                </div>

            </Form>
        </Container>
    )
}