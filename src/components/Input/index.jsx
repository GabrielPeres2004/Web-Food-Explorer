import { Container } from "./style";

export function Input({ icon: Icon, size = 20, ...rest }) {
    return (
        <Container
            id="inputSearch"
            {...rest}>
            {Icon && <Icon size={size} />}

            <input type="text" {...rest} />

        </Container>
    )
}