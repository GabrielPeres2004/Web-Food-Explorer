import { Container } from "./style";


export function Section({ children }) {
    return (
        <Container className="field-Inputs">
            {children}
        </Container>
    )
}