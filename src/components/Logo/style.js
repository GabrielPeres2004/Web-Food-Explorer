import styled from "styled-components";
import { LAYOUTBREAKPOINTS } from "../../styles/layoutBreakpoints";



export const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-wrap: nowrap;

width: 100%;

gap: .8rem;

#polygon {
    width: 4rem;
    height: 4rem;
    object-fit: contain;
}

#logo {
    width: 14rem;
    height: 14rem;
}

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    #polygon {
        width: 5rem;
        height: 5rem;
    }
    
    #logo {
        width: 18rem;
        height: 18rem;
    }
    
}


@media (min-width: ${LAYOUTBREAKPOINTS.XXG}) {
    #polygon {
        width: 8rem;
        height: 8rem;
    }
    
    #logo {
        width: 28rem;
        height: 28rem;
    }
    
}



`