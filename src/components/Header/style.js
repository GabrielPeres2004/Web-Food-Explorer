import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";

export const Container = styled.header`
grid-area: header;
display: flex;
align-items: center;
justify-content: space-between;

overflow: hidden;

width: 100%;

background-color: ${({ theme }) => theme.COLORS.DARK_300};
padding: 4.6rem 2rem 2.4rem;

#Logo {
    display: flex;
    gap: 1rem;

    p {
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 1.8rem;
    }

}

.profile {
    display: none;
}

#openMenu {
    background: transparent;
    width: max-content;
}


#input, #CartItems, #signOut{
    display: none;
}

#myFavorites, #orderHistory, #newDish {
    display: none;
}

@media (min-width: ${LAYOUTBREAKPOINTS.SM}) {
    padding: 5.6rem 1.2rem 2.4rem;

    #List {
        font-size: 3.2rem;
    }

    #Logo {
        p {
            font-size: 2.2rem;
        }
    }
} 

@media (min-width: ${LAYOUTBREAKPOINTS.LG}) {

        .profile {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: ${({ theme }) => theme.COLORS.WHITE};
            gap: 1rem;

            img {
                width: 6.4rem;
                height: 6.4rem;
                object-fit: cover;
                border-radius: 50%;
                cursor: pointer;
            }

}

    gap: .8rem;
    
    #openMenu, #List,#ShoppingCart{
        display: none;
    }


    #myFavorites, #orderHistory, #newDish {
        display: block;
        color: ${({ theme }) => theme.COLORS.WHITE};
        width: max-content;
        white-space: nowrap;

        P {
            font-size: 1.6rem;
        }
    }

    
    #Logo{
        display: none;
    }

    #input{
        display: flex;
    }

    #CartItems {
        display: flex;
        width: 29rem;
    }

    #signOut{
        display: flex;
        width: max-content;
        background: transparent;
    }

}
        
`

export const ShoppingCart = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;


padding: 1.6rem;

svg {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 2.8rem;
}

#numberCart{
    position: absolute;
    background-color: red;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    top: 1rem;
    right: 0rem;
    
    padding: 1rem;
    width: 2rem;
    height: 2rem;


    p {
        color: ${({ theme }) => theme.COLORS.WHITE};
    }
}

@media (min-width: ${LAYOUTBREAKPOINTS.SM}) {
    svg {
    font-size: 3.2rem;
}

#numberCart{
    padding: 1.2rem;
}


}

`