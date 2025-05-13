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

display: flex;
align-items: center;
justify-content: space-evenly;
flex-direction: column;

padding: 1rem;

gap: 2rem;

> button {
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2rem;
  padding-left: 1.6rem;    
}

@media (min-width: ${LAYOUTBREAKPOINTS.SM}) {
  padding: 1rem 2.2rem;
}

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
  padding: 4.2rem 3.8rem;
}

`

export const Content = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

width: 100%;

img {
  width: 18.4rem;
  height: 18.4rem;
  border-radius: 10%;
  object-fit: cover;
}

.informations {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.nameDish {
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 2rem;
  margin-block: 2rem;
}

.description {
  color: ${({ theme }) => theme.COLORS.WHITE};
}

.Tags {

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  
  
  margin-top: 3.2rem;
  
  padding: 2rem;
  
  gap: 1rem;

}

.addToCart{
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2.4rem;
  
  width: 100%;

  .addAndSubtract{
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;

    height: max-content;
    width: 35%;

    border-radius: 1rem;

    button:nth-child(2){
      margin-inline: 2rem;
    }

  }


  .buttonCart{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65%;
  }

}

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {

  img {
    width: 28.4rem;
    height: 28.4rem;
  }



  .informations{
    justify-content: center;
    align-items: center;
  }


  .Tags {
    justify-content: flex-start;
    align-items: center;
    padding: 0;
  }
    

  .addToCart {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 3.2rem;
    max-width: 100%;
  
  .addAndSubtract{
    display: flex;
    justify-content: center;
    align-items: center;

    button:hover{
      scale: 1.1;
    }

  }


  .buttonCart{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }


}

}

`