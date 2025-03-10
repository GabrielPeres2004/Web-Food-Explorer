import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";

export const Container = styled.div`
display: grid; 
grid-template-columns: auto 1fr; 
grid-template-rows: auto 1fr; 
grid-template-areas: 
"menu header"
"menu content";

width: 100%;
height: 100vh;
overflow: hidden;

main {
    grid-area: content;
    
    margin-top: 3.2rem;
    
    padding: 1.2rem;

    overflow-y: auto;

    @media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
        padding: 1.4rem 6.4rem;
    }
    
    @media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
        padding: 1.4rem 10.6rem;
    }
    
    button {
        margin-bottom: 3rem;
    }


    h1 {
        font-size: 2.4rem;
        color: ${({ theme }) => theme.COLORS.WHITE};
    }
    
    
    .Orders {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        padding-block: 1rem;

        height: 90%;
        
        overflow-y: auto;
        
        gap: 2.4rem;
        
        border-radius: 1rem;

    }
    
}

`