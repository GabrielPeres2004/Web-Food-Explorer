import { Container } from "./style";

import { FiEye, FiEyeOff } from "react-icons/fi";

import { useState } from "react";

export function Input({ icon: Icon, endIcon, size = 20, type, ...rest }) {

    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container
            id="inputSearch"
            {...rest}>
            {Icon && <Icon size={size} />}

            <input
                type={type === "password" && showPassword ? "text" : type}  {...rest}
            />

            {type === "password" && (
                showPassword ? (
                    <FiEyeOff size={size} onClick={togglePasswordVisibility} />
                ) : (
                    <FiEye size={size} onClick={togglePasswordVisibility} />
                )
            )}

        </Container>
    )
}