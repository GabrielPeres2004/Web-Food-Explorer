import { Container } from "./style";

export function ButtonText({ title, icon: Icon, onClick, size }) {
    return (
        <Container type="button" onClick={onClick} >
            {Icon && <Icon size={size} />}

            <p>{title}</p>
        </Container>
    )
}