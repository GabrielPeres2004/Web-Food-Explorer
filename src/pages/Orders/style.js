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
`

export const Main = styled.main`
grid-area: content;

padding: 1.2rem;

overflow-y: auto;

color: white;

> Button {
    margin-bottom: 1rem;
}

table {
    display: none;
}

.titleScreenLarge {
    display: none;
}

h1 {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 2.8rem;
    margin-bottom: 2rem;
}


@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    padding: 1.4rem 6.4rem;
}

@media (min-width: ${LAYOUTBREAKPOINTS.LG}) {

    .OrderBox {
        display: none;
    }
    
    .titleScreenNarrow {
        display: none;
    }

    .titleScreenLarge {
        display: block;
    }

    table {
        display: table;
        width: 100%;

        text-align: left;

        border-collapse: collapse;

    }

    table th {
        padding: 1rem;
        font-size: 1.4rem;
        background-color: ${({ theme }) => theme.COLORS.DARK_600};
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.LIGHT_500};
    }
        
    table th:first-child {
        border-top-left-radius: 1rem;
    }

    table th:last-child {
        border-top-right-radius: 1rem;
    }
    
    table th:nth-child(2), 
    table th:nth-child(3), 
    table th:nth-child(4) {
        border-left: 1px solid ${({ theme }) => theme.COLORS.LIGHT_500};
    } 
        
    
    table td {
        padding: 1rem;
        font-size: 1.6rem;
        background-color: ${({ theme }) => theme.COLORS.DARK_600};
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.LIGHT_500};
        border-inline: 1px solid ${({ theme }) => theme.COLORS.LIGHT_500};
    }
    
    table td:nth-child(2), 
    table td:nth-child(3),
    table td:nth-child(4) {
        border-left: 1px solid ${({ theme }) => theme.COLORS.LIGHT_500};
    } 

    select {
        padding: 1rem ;
        width: 100%;
        
        border-radius: 1rem;
        
        background-color: ${({ theme }) => theme.COLORS.DARK_300};
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
        
        border: none;
        outline: none;
    }
            


    table .orderStatus {
        
        div {
            display: flex;
            align-items: center;
            gap: .8rem;
            
            span {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }

            .pending {
                background-color: ${({ theme }) => theme.COLORS.CARROT};
            }

            .cancelled {
                background-color: ${({ theme }) => theme.COLORS.TOMATO_300};
            }

            .completed {
                background-color: ${({ theme }) => theme.COLORS.MINT};
            }

        }
}

}
    

`
