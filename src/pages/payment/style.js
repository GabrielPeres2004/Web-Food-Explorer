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

padding: 1.2rem;

overflow-y: auto;

> button {
  margin-block:4.2rem ;
}

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
    padding: 1.4rem 6.4rem;
}

@media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
    padding: 1.4rem 10.6rem;
}


`


export const Section = styled.section`
display: flex;
align-items:  flex-start;
justify-content: center;
flex-direction: column;

margin-top: 2rem;

h1 {
  font-size: 2.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.WHITE};
}

.details {
  display: flex;
  flex-direction: column;
  width: 100%;
  
  padding: 1.2rem;
  border-radius: 1rem;

  gap: .4rem;

  background-color: ${({ theme }) => theme.COLORS.DARK_600};
  color: ${({ theme }) => theme.COLORS.WHITE};

  margin-top: 1rem;

  #linkToProfile {
    text-decoration: underline;
    cursor: pointer;
    transition: color 600ms ease-in-out;
    color: ${({ theme }) => theme.COLORS.BLUE};
  }
  
  #linkToProfile:hover {
    color:rgb(112, 209, 219);
  }

}

  .Orders {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
    padding-block: 2rem;

    width: 100%;
    max-height: 35rem;
    
    overflow-y: auto;
    
    gap: 2.4rem;
    
    border-radius: 1rem;

    margin-block: 1rem 4rem;


    @media (min-width: ${LAYOUTBREAKPOINTS.LG}) {
      max-height: 45rem;
    }

      
  }

  
  .paymentOptions {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;

    .buttonFields{
      display: flex;
      width: 100%;

    .pix {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      background: none;
      width: 100%;

      color: ${({ theme }) => theme.COLORS.WHITE};
      border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_600};
      border-top-left-radius: 1rem;

      padding: 1rem;
    }

    .pixActive{
      background-color: ${({ theme }) => theme.COLORS.DARK_700};
    }

    .creditCard {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      background: none;
      width: 100%;

      color: ${({ theme }) => theme.COLORS.WHITE};
      border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_600};
      border-top-right-radius: 1rem;

      padding: 1rem;
    }

    .creditCardActive {
      background-color: ${({ theme }) => theme.COLORS.DARK_700};
    }

  }

    .info-payment {
      display: flex;
      align-items: center;
      justify-content: center;
      
      width: 100%;

      padding: 4rem;

      border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_600};

      border-bottom-left-radius: 1rem;
      border-bottom-left-radius: 1rem;

      color: ${({ theme }) => theme.COLORS.WHITE};

      .optionsDelivery {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 2.4rem;


        label{
          display: flex;
          align-items: center;
        }

      }

      .paymentPix {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
          width: 18rem;
          height: 18rem;
        }
        

        .finishOrder {
          width: 100%;
        }

        @media (min-width: ${LAYOUTBREAKPOINTS.MD}) {

          img {
            width: 28rem;
            height: 28rem;
          }

          .optionsDelivery {
            justify-content: space-evenly;

          }
        }

      }


      form {
        display: flex;
        justify-content: center;
        flex-direction: column;

        width: 100%;

        gap: 2rem;

        label {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          width: 100%;

          gap: .8rem;
          
          p {
            color: ${({ theme }) => theme.COLORS.LIGHT_400};
          }

          input {
            background: transparent;
            color: ${({ theme }) => theme.COLORS.LIGHT_500};

            border: 1px solid ${({ theme }) => theme.COLORS.LIGHT_500};
            border-radius: 1rem;

            padding: 1.6rem;

            width: 100%;
          }


        }


        .optionsDelivery {

          display: flex;
          align-items: center;
          justify-content: space-evenly;
          
          label {
            width: max-content;

            flex-direction: row;
            align-items: center;

            gap: 0rem;

          }

          }

          
      }

        .numberInstallments {
          width: 100%; 

          p {
            color: ${({ theme }) => theme.COLORS.LIGHT_400};
            margin-bottom: .8rem;
          }

          select {
            width: 100%;

            padding: 1.6rem;

            color: ${({ theme }) => theme.COLORS.LIGHT_500};

            background-color: ${({ theme }) => theme.COLORS.DARK_800};

            outline: none;

            border-radius: 1rem;


          }


        }

        .info-creditCard {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 2rem;

          @media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
            flex-direction: row;
          }

        }
      }

      .finishOrder {
          display: flex;
          align-items: center;
          flex-direction: column;

          margin-top: 4rem;
          gap: 1rem;

         @media (min-width: ${(LAYOUTBREAKPOINTS.MD)}) {
           align-items: flex-start;
        }
      }

    }
          




`