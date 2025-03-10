import styled from "styled-components";

export const Container = styled.span`
padding: .8rem 2rem;
background: ${({ theme }) => theme.COLORS.DARK_1000};

border-radius: .8rem;

font-size: 1.2rem;
color: ${({ theme }) => theme.COLORS.WHITE};
`