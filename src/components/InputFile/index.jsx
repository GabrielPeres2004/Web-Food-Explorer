import { Container } from "./style";

export function InputFile({ icon: Icon, title, ...rest }) {
    return (
        <Container
            id="inputFile"
            {...rest}>
            {Icon && <Icon size={20} />}

            <label htmlFor="File">{title}</label>

            <input type="file" id="File" {...rest} />

        </Container>
    )
}