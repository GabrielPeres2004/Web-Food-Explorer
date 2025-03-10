import styled from "styled-components";

export const Container = styled.textarea`
width: 100%;
height: 16rem;

border-radius: .8rem;
border: none;
outline: none;
resize: none;


background-color: ${({ theme }) => theme.COLORS.DARK_700};

padding: 1.4rem;

color: ${({ theme }) => theme.COLORS.LIGHT_400} ;

&::placeholder{
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
    }

`