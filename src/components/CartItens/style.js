import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
gap: 1rem;

padding: 1rem;

img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
}

.itemInformation {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    .item-description {
        display: flex;
        align-items: center;

        h1 {
            font-size: 2.2rem;
            color: ${({ theme }) => theme.COLORS.WHITE};
        }

        .price {
            display: none;
        }

    }
    
    .removeItem {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.COLORS.TOMATO_400};
        cursor: pointer;
    }

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {

    .item-description {
        gap: 1rem;
        
        h1 {
            font-size: 2.6rem;
        }
            
        .price {
        display: block;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
    }
        
    }

    .removeItem {
        font-size: 1.6rem;
    }
}

}



@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    gap: 2rem;
    
    img {
        width: 10rem;
        height: 10rem;
    }


}

`