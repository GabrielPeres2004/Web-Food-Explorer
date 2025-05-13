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
overflow-y: auto;

padding: 1.2rem;

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    padding: 1.4rem 6.4rem;
}

@media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
    padding: 1.4rem 10.6rem;
}

> button {
  margin-block: 4.2rem;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


  .UserImage {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    
    img {
      width: 18.2rem;
      height: 18.2rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  section {
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100%;

    gap: 2.4rem;

    h2 {
      color: ${({ theme }) => theme.COLORS.LIGHT_400};
      margin-top: 2rem;
      font-size: 2rem;
      font-weight: 400;
    }

    label {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      
      width: 100%;
      gap: .8rem;

      
      p {
        color: ${({ theme }) => theme.COLORS.LIGHT_400};
      }

      #inputSearch {
        background-color: ${({ theme }) => theme.COLORS.DARK_700};
      }
    }

  }


  @media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
    align-items: flex-start;
    flex-direction: row;
    gap: 6rem;
    margin-top: 6rem;

    .UserImage {
      display: flex;
      margin-bottom: 0;
    }

  }



}


`
