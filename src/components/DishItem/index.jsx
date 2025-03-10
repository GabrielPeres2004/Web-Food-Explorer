import { Container } from './style'
import { FiPlus, FiX } from "react-icons/fi"

export function DishItem({ isNew, value, onClick, ...rest }) {
    return (
        <Container $isNew={isNew}>


            <input
                type="text"
                value={value}
                readOnly={!isNew}
                {...rest} />


            <button
                onClick={onClick}>
                {isNew ? <FiPlus /> : <FiX />}
            </button>

        </Container>
    )
}