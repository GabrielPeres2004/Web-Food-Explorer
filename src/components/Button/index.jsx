import { Container } from "./style";

import { FiLoader } from "react-icons/fi";

export function Button({ icon: Icon, title, size, count, loading = false, ...rest }) {
    return (
        <Container
            type="button" disabled={loading} {...rest}>

            <div>
                <i>{Icon && <Icon size={size} />}</i>
                <p>{loading ? <FiLoader className="spin" /> : title}</p>
                <p className="count">{count}</p>
            </div>

        </Container>
    )
}