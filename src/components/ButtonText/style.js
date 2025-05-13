import styled from "styled-components";

export const Container = styled.button`
display: flex;
align-items: center;
justify-content: center;

height: max-content;
gap: .8rem;

background: none;
border: none;

color: ${({ theme }) => theme.COLORS.WHITE};

p {
    font-size: 2rem;
}

`