import styled from "styled-components"
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints"


export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;

width: 100%;
height: 100vh;

padding: 2rem;

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 0;
    
    
}

    

`

export const Form = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;

width: 100%;
height: 100%;

border-radius: 1rem;


h1 {
    display: none ;
}

#link {
    margin-top: 1rem;

    a {
        font-size: 2rem;
        color: ${({ theme }) => theme.COLORS.WHITE};
    }
}

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    background-color: ${({ theme }) => theme.COLORS.DARK_300};
    padding: 4rem;
    justify-content: center;
    
    h1 {
        display: block;
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 3.2rem;
        margin-block: 1rem 3.2rem;
        font-weight: 500;
    }


}

`