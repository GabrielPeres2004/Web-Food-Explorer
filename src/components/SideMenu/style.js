import styled from "styled-components";

export const Container = styled.aside`
grid-area: menu;

align-items: center;
justify-content: flex-start;
flex-direction: column;

position: absolute;
z-index: 1;

overflow: hidden;
width: 100%;
height: 100%;


transform: translateX(-100%);
transition: transform .5s ease-in-out;

&[data-menu-is-open='true']{
    transform: translateX(0);
    display: block;
}



color: white;

`

export const Header = styled.header`
display: flex;
align-items: center;
justify-content: flex-start;

width: 100%;
padding: 5.4rem 2.8rem 3.2rem;

background-color: ${({ theme }) => theme.COLORS.DARK_300};

#closeMenu{
    background: transparent;
    width: max-content;
    
}

#Logo{
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        width: 3.2rem;
        height: 3.2rem;
        object-fit: contain;
    }

}

`


export const Main = styled.div`
width: 100%;
height: 100%;
padding: 1.2rem;
background-color: ${({ theme }) => theme.COLORS.DARK_800};

> div {
    margin-block: 2.4rem;
}


#button{
    background: transparent;
    justify-content: flex-start;

    border-bottom: 1px solid ${({ theme }) => theme.COLORS.DARK_700};
    border-radius: 0;
}


`