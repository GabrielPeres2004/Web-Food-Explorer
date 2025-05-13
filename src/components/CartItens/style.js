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
    border-radius: 50%;
}

.itemInformation {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    padding: 1rem;

    .item-description {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        
        h4 {
            font-size: 2.2rem;
            color: ${({ theme }) => theme.COLORS.WHITE};
            
            width: 80%;
        }

            display: flex;

            .price {
                display: none;
            }
            
            .quantity {
                color: ${({ theme }) => theme.COLORS.LIGHT_400};
                white-space: nowrap;
            }

    }
    
    .removeItem {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.COLORS.TOMATO_300};
        cursor: pointer;
    }

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {

    .item-description {
        flex-direction: column;
        align-items: flex-start;
        gap: .2rem;

        h1 {
            font-size: 2.6rem;
        }

        div {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;

            .price {
                display: block;
                font-size: 1.6rem;
                color: ${({ theme }) => theme.COLORS.LIGHT_400};
            }
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