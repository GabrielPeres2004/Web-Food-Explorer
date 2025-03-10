import styled from "styled-components";

export const Container = styled.div`
display: flex;
align-items: center;

width: 100%;
height: 5.6rem;

padding: 1.6rem 1.2rem;

background-color: ${({ theme }) => theme.COLORS.DARK_700};
color: ${({ theme }) => theme.COLORS.LIGHT_400};

border-radius: 1rem;

input[type="file"] {
    display: none; 
}

label {
    width: 100%;
    background: transparent;   
    border: none;
    outline: none;
}    

svg {
    margin-right: 1rem;
    color: ${({ theme }) => theme.COLORS.LIGHT_400};
}

`