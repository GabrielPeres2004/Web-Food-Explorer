import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";

export const Container = styled.div`
width: 100%;

color: ${({ theme }) => theme.COLORS.LIGHT_400};
border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_400};

padding: 1.6rem ;

border-radius: 1rem;

header {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    width: 100%;

    .statusOrder {
        display: flex;
        align-items: center;
        gap: .4rem;

        .statusCircle {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    
        .statusCircle.status-cancelled {
            background-color: ${({ theme }) => theme.COLORS.TOMATO_300};
        }

        .statusCircle.status-pending {
            background-color: ${({ theme }) => theme.COLORS.CARROT};
        }
            
        .statusCircle.status-completed {
            background-color: ${({ theme }) => theme.COLORS.MINT};
        }

    }

    select {
        padding: 1rem ;
        width: 100%;
        
        border-radius: 1rem;
        
        background-color: ${({ theme }) => theme.COLORS.DARK_600};
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
        
        border: none;
        outline: none;
    }


}


main {
    display: flex;
    align-items: center;

    width: 100%;

    margin-top: 2rem;

    .descriptionOrder {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        width: 100%;

        padding: 1.2rem;

        flex-wrap: wrap;

        gap: .8rem;

    }


    
}


`