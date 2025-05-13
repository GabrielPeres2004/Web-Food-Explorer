import styled from "styled-components";

export const Container = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

padding: 1rem ;

width: 100%;


div, label {
    width: 100%;

    
    h2 {
        margin-left: .5rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
        font-weight: 500;
    }

   div {
        margin-bottom: 4.2rem;
    }


}


`