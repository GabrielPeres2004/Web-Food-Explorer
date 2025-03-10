import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

background: ${({ theme }) => theme.COLORS.DARK_900};

width: 90%;

border-radius: 2.4rem;
border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_300};

padding: 2rem;


#favorite {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
    
    svg {
        color: ${({ theme }) => theme.COLORS.WHITE};
    }
    
}

&[data-is-favorite='true']{
    #addTofavorites {
        color: ${({ theme }) => theme.COLORS.TOMATO_500}
    }
}

img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    margin-bottom: 2rem;
}

p {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 1.8rem;
}

span {
    margin-top: .5rem;
    color: ${({ theme }) => theme.COLORS.BLUE};
    font-size: 1.6rem;
}

#addToCart {
    display: flex;
    align-items: center;
    
    button {
        font-size: 2.4rem;
        margin-inline: .5rem;
        letter-spacing: .4rem;
    }
}

#buttonInclude{
    margin-top: 2rem;
}

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    img {
        width: 12rem;
        height: 12rem;
    }
}


@media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
    
    img {
        width: 13rem;
        height: 13rem;
    }

    #favorite {
        svg {
            cursor: pointer;
        }
        
        svg:hover{
            animation: heartBeat;
            animation-duration: 2s;
            animation-iteration-count: infinite;
        }

    }

}

`