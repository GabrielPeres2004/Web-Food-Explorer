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
display: flex;
flex-direction: column;
align-items: flex-start;

padding: 1.2rem;

overflow-y: auto;


@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
  padding: 1.4rem 10.6rem;

  .information-dish {
    display: flex;
    gap: 1.2rem;
  }

  .categoryAndPrice {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column-reverse;
    gap: 2rem;

    .dolar {
      width: 100%;
    }

  }
}

@media (min-width: ${LAYOUTBREAKPOINTS.LG}) {

  .categoryAndPrice {
    flex-direction: row;

    align-items: center;

    .dolar {
      width: 60%;
    }

  }

}



form {
  width: 100%;
}

h1 {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 3rem;

    margin-block: 2rem;
}


section {
    padding: 0;

    #inputSearch {
      background-color: ${({ theme }) => theme.COLORS.DARK_700};
    }


    select {
      width: 100%;
      

      padding: 2rem 1.6rem;
      
      border-radius: 1rem;

      background-color: ${({ theme }) => theme.COLORS.DARK_700};
      color: ${({ theme }) => theme.COLORS.LIGHT_400};

      border: none;
      outline: none;

      margin-bottom: 1.2rem;

    }

    .Tags-field {
      width: 100%;

      .tags {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        width: 100%;

        padding: 1rem;

        gap: 1rem;
        
        background-color:${({ theme }) => theme.COLORS.DARK_700};
        
        border-radius: 1rem;

        @media (min-width: ${LAYOUTBREAKPOINTS.XL}) {
          justify-content: flex-start;
        }

      }
    }

    .saveAndDeleteButton{
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      width: 100%;
      gap: 2rem;

      #SaveChanges {
        background-color: ${({ theme }) => theme.COLORS.TOMATO_400};
      }

      #DeleteButton {
        background-color: ${({ theme }) => theme.COLORS.DARK_700};
      }

      @media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
        flex-direction: row;
      }
      
    }


}
`
