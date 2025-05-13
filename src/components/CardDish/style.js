import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

background: ${({ theme }) => theme.COLORS.DARK_900};

width: 100%;
height: 100%;
overflow: hidden;

border-radius: 2.4rem;
border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_300};

padding: 2rem;

text-align: center;

#favorite {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
    
    #addTofavorites {
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    #removeTofavorites {
        color: ${({ theme }) => theme.COLORS.RED};
    }

    svg {
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

}


img {
    width: 16rem;
    height: 16rem;
    object-fit: cover;
    margin-block: 2rem;
    border-radius: 10%;
}

#nameDish {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 1.8rem;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    width: 100%;
}

#description, #desactiveDish {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    width: 100%;

    font-size: 1.6rem;

    color: ${({ theme }) => theme.COLORS.LIGHT_400};

    text-align: center;

    margin-block: 1.2rem;
}

#desactiveDish {
    color: red;
    font-size: 1.8rem;
}

span {
    margin-top: .5rem;
    color: ${({ theme }) => theme.COLORS.BLUE};
    font-size: 1.6rem;
    margin-bottom: 2rem;
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
        width: 18rem;
        height: 18rem;
    }
}


@media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
    
    img {
        width: 18rem;
        height: 18rem;
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